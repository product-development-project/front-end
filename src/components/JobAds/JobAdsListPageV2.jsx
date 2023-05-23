import React, { useState, useEffect } from 'react'
import axios from 'axios';
import HeaderV2 from '../HeaderV2';
import '../JobAds/style.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

export default function JobAdsListPageV2() {
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [data, setData] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState(1);

    useEffect(() => {
        fetchLeaderboard();
    });

    async function fetchLeaderboard() {
        try {
            let result = await axios.get(`http://localhost:5163/api/Ad`, { headers: { 'Content-Type': 'application/json' } });
            setData(JSON.parse(JSON.stringify(result.data)));
        }
        catch (error) {
            setErrorMessage("Failed to fetch data");
            setOpenSnackbar(true);
        }
    };

    function sortData(column) {
        let sortedData = data.sort((a, b) => {
            if (a[column] < b[column]) {
                return -1 * sortOrder;
            }
            if (a[column] > b[column]) {
                return 1 * sortOrder;
            }
            return 0;
        });
        setData(sortedData);
        setSortColumn(column);
        setSortOrder(sortOrder * -1);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        setErrorMessage('');
    };

    return (
        <>
            <HeaderV2></HeaderV2>
            <table>
                <tr className="border-bottom-JobList delayed-animation-JobList" style={{ animationDelay: `${50}ms` }}>
                    <td onClick={() => sortData('name')}>Name{sortColumn === 'name' && sortOrder === 1 ? ' ▲' : sortColumn === 'name' ? ' ▼' : ''}</td>
                    <td onClick={() => sortData('description')}>Description{sortColumn === 'description' && sortOrder === 1 ? ' ▲' : sortColumn === 'description' ? ' ▼' : ''}</td>
                    <td onClick={() => sortData('start')}>Start date{sortColumn === 'start' && sortOrder === 1 ? ' ▲' : sortColumn === 'start' ? ' ▼' : ''}</td>
                    <td onClick={() => sortData('end')}>End date{sortColumn === 'end' && sortOrder === 1 ? ' ▲' : sortColumn === 'end' ? ' ▼' : ''}</td>
                </tr>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id} className="delayed-animation-JobList" style={{ animationDelay: `${50 * (index + 1)}ms` }}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{formatDate(item.start)}</td>
                            <td>{formatDate(item.end)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                {errorMessage ? (
                    <Alert onClose={handleCloseSnackbar} severity="error">
                        {errorMessage}
                    </Alert>
                ) : (
                    <Alert onClose={handleCloseSnackbar} severity="success">
                        Approved successfully!
                    </Alert>
                )}
            </Snackbar>
        </>
    );
}
