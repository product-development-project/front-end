import React, { useState, useEffect, useMemo } from 'react'
import Header from '../Header';
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

export default function CreateAdds() {

    const tokenWithQuotes = localStorage.getItem('access-token');
    const token = tokenWithQuotes.substring(1, tokenWithQuotes.length - 1);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const navigate = useNavigate();

    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    async function addAdds(e) {
        e.preventDefault();
        const start = moment(StartDate).format("YYYY-MM-DDTHH:mm:ss");
        const end = moment(EndDate).format("YYYY-MM-DDTHH:mm:ss");
        let details = { Name, Description, start, end };
        let json = JSON.stringify(details);
        await axios.post('http://localhost:5163/api/Ad', json, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                navigate('/home/Company/ViewAds')
            })
            .catch(error => {
                //setErrorMessage(error.response.data);
                console.log(error)
            });
    }

    return (
        <div className="App">
            <Header />
            <Container>
                <br />
                <div className="col-sm-6 offset-sm-3">
                    <h2>create a job AD </h2>
                    <br />
                    <Form onSubmit={addAdds}>
                        <fieldset>
                            <input type="text" value={Name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Name" required />
                            <br />
                            <input type="text" value={Description} onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Description" required />
                            <br />
                            <DatePicker selected={StartDate} onChange={date => setStartDate(date)} className="form-control" placeholderText="Start date" required />
                            <br />
                            <DatePicker selected={EndDate} onChange={date => setEndDate(date)} className="form-control" placeholderText="End date" required />
                            <br />
                            <button id="submit" value="submit" className="btn btn-success">Create</button>
                            <Link to={'/home/Company'} ><Button variant='danger' className='my-1 m-1'>Cancel</Button></Link>
                        </fieldset>
                    </Form>

                </div>
            </Container>
        </div>
    )
};