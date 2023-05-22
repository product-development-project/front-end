import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../UI/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CiPhone, CiMail, CiDesktop, CiHome } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import { Popup } from '../UI/Popup';
import ProfileForm from './ProfileForm';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useParams } from 'react-router';
import Header from '../Header';

const useStyles = makeStyles({
    root: {
        width: '900px',
        height: '430px',
        position: 'relative',
        zIndex: '2'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Profile() {
    const [errorMessage, setErrorMessage] = useState('');
    const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
    const [taskCount, setTaskCount] = useState([]);
    const navigate = useNavigate();
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [companyData, setCompanyData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    let username = localStorage.getItem('username')
    const tokenWithQuotes = localStorage.getItem('access-token');
    const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    let role = localStorage.getItem('roles');

    useEffect(() => {
        if (!localStorage.getItem('access-token')) {
            navigate('/');
        }
        if (role.includes("User") || role.includes("Company")) {
            fetchUserInfo(username);
        }
        if (role.includes("User")) {
            fetchUserCompletedTasks(username);
        }
        if (role.includes("Company")) {
            fetchCompanyInfo(username)
        }
        createGraph();
    }, [navigate, username]);

    async function fetchUserInfo(username) {
        let result = await axios.get(`http://localhost:5163/api/User/${username}`, { headers: { 'Content-Type': 'application/json' } })
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    async function fetchUserCompletedTasks(username) {
        let result = await axios.get(`http://localhost:5163/api/TaskCount/${username}`, { headers: { 'Content-Type': 'application/json' } })
        setTaskCount(JSON.parse(JSON.stringify(result.data)));
    }

    async function fetchCompanyInfo(username) {
        let result = await axios.get(`http://localhost:5163/api/Company/${username}`, { headers: { 'Content-Type': 'application/json' } })
        setCompanyData(JSON.parse(JSON.stringify(result.data)));
    }

    async function createGraph() {
        let result = await axios.get(`http://localhost:5163/api/Ratings`, { headers: { 'Content-Type': 'application/json' } })
        const allRatings = result.data;
        const otherRatings = allRatings.filter(rating => rating.userName !== username);

        const currentUserRating = allRatings.find(rating => rating.userName === username);

        const otherUsersAvgCorrectness = otherRatings.reduce((total, rating) => total + rating.correctnesPoints, 0) / otherRatings.length;
        const otherUsersAvgTime = otherRatings.reduce((total, rating) => total + rating.timePoints, 0) / otherRatings.length;
        const otherUsersAvgResources = otherRatings.reduce((total, rating) => total + rating.recourcesPoints, 0) / otherRatings.length;

        const state = {
            labels: ['Correctness', 'Run Time', 'RAM Usage'],
            datasets: [
                {
                    label: 'Other Users Average',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 1,
                    data: [otherUsersAvgCorrectness, otherUsersAvgTime, otherUsersAvgResources]
                },
                {
                    label: 'Current User',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    data: [currentUserRating.correctnesPoints, currentUserRating.timePoints, currentUserRating.recourcesPoints]
                }
            ]
        };

        setGraphData(state);
    }

    const toggleEditPopup = () => {
        setEditPopupIsOpen(!editPopupIsOpen);
    };

    return (
        <>
            <Header></Header>

            {
                role.includes("User") ?
                    <center style={{ marginTop: '5%' }}>
                        <Card className={classes.root}>
                            <CardContent>
                                <Typography variant="h6" component="h2" style={{ marginBottom: '10px' }}>
                                    Hello, {data.name}
                                </Typography>
                                <div style={{ float: 'left' }}>
                                    <Card style={{ width: '300px', height: '150px' }}>
                                        <CardContent>
                                            <Typography className={classes.pos} color="initial">
                                                <IconContext.Provider value={{ size: '1.2em', style: { verticalAlign: 'middle' } }}>
                                                    <CgProfile />
                                                </IconContext.Provider>
                                                {data.name}
                                            </Typography>
                                            <Typography className={classes.pos} color="initial">
                                                <IconContext.Provider value={{ size: '1.2em', style: { verticalAlign: 'middle' } }}>
                                                    <CiMail />
                                                </IconContext.Provider>
                                                {data.email}
                                            </Typography>
                                            <Typography className={classes.pos} color="initial">
                                                <IconContext.Provider value={{ size: '1.2em' }}>
                                                    <CiPhone />
                                                </IconContext.Provider>
                                                {data.phonenumber}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div style={{ position: 'absolute', paddingTop: '200px' }}>
                                    <Card style={{ width: '300px', height: '150px' }}>
                                        <CardContent>
                                            <Typography className={classes.pos} color="initial">
                                                Milestones on workIT page
                                            </Typography>
                                            <Typography className={classes.pos} color="initial">
                                                Place in leaderboard: 8
                                            </Typography>
                                            <Typography className={classes.pos} color="initial">
                                                Exercices completed: {taskCount.count}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div>
                                    <Card style={{ width: '550px', height: '350px' }}>
                                        <CardContent>
                                            <Typography className={classes.pos} color="initial">
                                                Code analysis between other users
                                            </Typography>
                                            {graphData.datasets && graphData.datasets.length > 0 &&
                                                <div style={{ paddingTop: '1em' }}>
                                                    <Bar
                                                        data={graphData}
                                                        options={{
                                                            title: {
                                                                display: true,
                                                                fontSize: 20
                                                            },
                                                            legend: {
                                                                display: true,
                                                                position: 'right'
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            }
                                        </CardContent>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                        <div style={{ marginRight: '10px', width: '800px', position: 'relative', zIndex: '2' }}>
                            <Button
                                value="Edit information"
                                name="profile-edit-button"
                                onClick={() => toggleEditPopup()}
                                style={{
                                    marginTop: '10px',
                                    float: 'right'
                                }}
                            />
                        </div>
                    </center>
                    :
                    <>
                    </>
            }

            {
                role.includes("Company") ?
                    <center style={{ marginTop: '5%' }}>
                    <Card
                    className={classes.root}
                    style={{
                        height: '280px',
                        background: 'linear-gradient(59deg, rgba(75,100,148,1) 0%, rgba(15,15,15,1) 100%)',
                        padding: '0 10px',
                        borderRadius: '40px' // Increase the borderRadius value to round more corners
                    }}
                    >
                    <div>
                        <CardContent>
                        <Typography variant="h6" component="h2" style={{ marginBottom: '10px', color: 'white', textDecoration: 'underline' }}>
                            Hello, {data.name}
                        </Typography>
                        <div style={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',padding: '0 15% 0 20%',}}>
                            <Typography className={classes.pos} style={{ color: 'white' }}>
                                <IconContext.Provider value={{ size: '1.2em', style: { verticalAlign: 'middle' } }}>
                                <CgProfile />
                                </IconContext.Provider>
                                {companyData.pavadinimas}
                            </Typography>
                       
                            <Typography className={classes.pos} style={{ color: 'white' }}>
                                <IconContext.Provider value={{ size: '1.2em', style: { verticalAlign: 'middle' } }}>
                                <CiMail />
                                </IconContext.Provider>
                                {companyData.email}
                            </Typography>
                        </div>
                        <div style={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',padding: '0 17% 0 20%', marginTop:'5%'}}>
                            <Typography className={classes.pos} style={{ color: 'white' }}>
                                <IconContext.Provider value={{ size: '1.2em' }}>
                                <CiDesktop />
                                </IconContext.Provider>
                                {companyData.svetaine}
                            </Typography>
                            <Typography className={classes.pos} style={{ color: 'white' }}>
                                <IconContext.Provider value={{ size: '1.2em' }}>
                                <CiHome />
                                </IconContext.Provider>
                                {companyData.adresas}
                            </Typography>
                        </div>
                        <div style={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',padding: '0 15% 0 20%', marginTop:'5%'}}>
                            <Typography className={classes.pos} style={{ color: 'white' }}>
                                <IconContext.Provider value={{ size: '1.2em' }}>
                                <CiPhone />
                                </IconContext.Provider>
                                {companyData.telefonas}
                            </Typography>
                            <Button
                            value="Edit information"
                            name="profile-edit-button"
                            onClick={() => toggleEditPopup()}
                            style={{
                                marginTop: '10px',
                                float: 'right'
                            }}
                            />
                        </div>
                        </CardContent>            
                    </div>
                    </Card>
                        
                </center>
                    :
                    <>
                    </>
            }

            {
                role.includes("Admin") ?
                    <center style={{ marginTop: '5%' }}>
                        <Card className={classes.root} style={{ height: '200px' }}>
                            <CardContent>
                                <Typography variant="h6" component="h2" style={{ marginBottom: '10px' }}>
                                    Hello, {data.name}
                                </Typography>
                                <Typography className={classes.pos} color="initial">
                                    <IconContext.Provider value={{ size: '1.2em', style: { verticalAlign: 'middle' } }}>
                                        <CgProfile />
                                    </IconContext.Provider>
                                    {data.name}
                                </Typography>
                                <Typography className={classes.pos} color="initial">
                                    <IconContext.Provider value={{ size: '1.2em', style: { verticalAlign: 'middle' } }}>
                                        <CiMail />
                                    </IconContext.Provider>
                                    {data.email}
                                </Typography>
                                <Typography className={classes.pos} color="initial">
                                    <IconContext.Provider value={{ size: '1.2em' }}>
                                        <CiPhone />
                                    </IconContext.Provider>
                                    {data.phonenumber}
                                </Typography>
                            </CardContent>
                        </Card>
                        <div style={{ marginRight: '10px', width: '800px', position: 'relative', zIndex: '2' }}>
                            <Button
                                value="Edit information"
                                name="profile-edit-button"
                                onClick={() => toggleEditPopup()}
                                style={{
                                    marginTop: '10px',
                                    float: 'right'
                                }}
                            />
                        </div>
                    </center>
                    :
                    <>
                    </>
            }
            {editPopupIsOpen &&
                <Popup
                    content={
                        <ProfileForm
                            toggleEditPopup={toggleEditPopup}
                            onClose={() => setEditPopupIsOpen(false)}
                        />
                    }
                    buttons={[
                        {
                            name: "Cancel",
                            onClick: toggleEditPopup
                        },
                    ]}
                />
            }
        </>
    );
};