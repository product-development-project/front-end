import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import TopBar from '../TopBar';
import { Button } from '../UI/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CiPhone, CiMail } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import { Popup } from '../UI/Popup';
import ProfileForm from './ProfileForm';
import axios from 'axios';
import Logo from '../Media/Photos/Logo.png';
import { useParams } from 'react-router';

  
const useStyles = makeStyles({
    root: {
        width: '800px',
        height: '380px',
        position:'relative',
        zIndex:'2'
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
    const [user, setUser] = useState(null);
    const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false);
    //const [username, setUsername] = useState(null);
    const navigate = useNavigate();
    const classes = useStyles();
    const [data, setData] = useState([]);
    let username = localStorage.getItem('username')
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access-token");
    useEffect(() => {
        if (!localStorage.getItem('access-token')) {
            navigate('/');
        }
        fetchUserInfo(username)
    }, [navigate, username]);
    
    async function fetchUserInfo(username)
    {
        let result = await axios.get(`http://localhost:5163/api/User/${username}`)
        setData(JSON.parse(JSON.stringify(result.data)));
    }

    const toggleEditPopup = () => {
        setEditPopupIsOpen(!editPopupIsOpen);
    };

    const toggleDeletePopup = (username = null) => {
        setDeletePopupIsOpen(!deletePopupIsOpen);
    };


    return (
        <>
            <TopBar
                title='workIT'
                backButtonDisabled={true}
            >
                <Button
                    value="Profile"
                    name="profile-button"
                    onClick={() => navigate('/home/profile')}
                    style={{
                        marginTop: '15px'
                    }}
                />
                <Button
                    value="Leaderboard"
                    name="leaderboard-button"
                    onClick={() => navigate('/home/leaderboard')}
                    style={{
                        marginTop: '15px'
                    }}
                />
                <Button
                    value="Exercise"
                    name="exercise-button"
                    onClick={() => navigate('/home/exercises')}
                    style={{
                        marginTop: '15px'
                    }}
                />
                <Button
                    value="Job competition"
                    name="job-competition-button"
                    onClick={() => navigate('/home/job/ads')}
                    style={{
                        marginTop: '15px'
                    }}
                />
            </TopBar>
                        
            <center>
                <img src={Logo} style={{height:'100%', width:'100%', objectFit:'cover', position:'absolute', top:'0', bottom:'0', right:"0", left:"0"}}></img>

                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h6" component="h2" style={{marginBottom: '10px'}}>
                            Hello, {data.name}
                        </Typography>     
                        <div style={{float: 'left'}}>
                            <Card style={{width: '250px'}}>
                                <CardContent>
                                    <Typography className={classes.pos} color="initial">
                                        <IconContext.Provider value={{ size: '1.2em', style: { verticalAlign: 'middle' }}}>
                                            <CgProfile />
                                        </IconContext.Provider>
                                        {data.name}
                                    </Typography>
                                    <Typography className={classes.pos} color="initial">
                                        <IconContext.Provider value={{ size: '1.2em', style: { verticalAlign: 'middle' }}}>
                                            <CiMail />
                                        </IconContext.Provider>
                                        {data.email}
                                    </Typography>
                                    <Typography className={classes.pos} color="initial">
                                        <IconContext.Provider value={{ size: '1.2em'}}>
                                        <CiPhone/>
                                        </IconContext.Provider>
                                        {data.phonenumber}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                        <div style={{ position: 'absolute', paddingTop: '160px'}}>
                            <Card style={{width: '250px'}}>
                                <CardContent>
                                    <Typography className={classes.pos} color="initial">
                                        Milestones on workIT page
                                    </Typography> 
                                    <Typography className={classes.pos} color="initial">
                                        Place in leaderboard: 8
                                    </Typography>
                                    <Typography className={classes.pos} color="initial">
                                        Exercices completed: 8
                                    </Typography> 
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Card style={{width: '500px', height: '308px'}}>
                                <CardContent>
                                    <Typography className={classes.pos} color="initial">
                                        Code analysis between all users
                                    </Typography> 
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
                <div style={{marginRight: '10px', width: '800px', position:'relative', zIndex:'2'}}>
                    <Button
                    value="Edit information"
                    name="profile-edit-button"
                    onClick={() => toggleEditPopup()}
                    style={{
                        marginTop: '10px',
                        float: 'right'
                    }}
                    />
                    <Button
                    value="Delete profile"
                    name="profile-delete-button"
                    onClick={() => toggleDeletePopup()}
                    style={{
                        marginTop: '10px',
                        float: 'right'
                    }}
                    />
                </div>
            </center>

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

            {deletePopupIsOpen &&
                <Popup
                    content={<div>Are you sure you want to delete your profile?</div>}
                    buttons={[
                        {
                        name: "Confirm",
                        onClick: () => {
                            axios
                                .delete(`http://localhost:5163/api/User/${username}`, { headers: { 'Content-Type': 'application/json' },  })
                                .then(() => {
                                    console.log(`User with username: ${username} deleted`);
                                    localStorage.clear();
                                    navigate("/");
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                            toggleDeletePopup();
                        }
                        },
                        {
                        name: "Cancel",
                        onClick: toggleDeletePopup
                        },
                    ]}
                />
            }

            <Footer>
            </Footer>
        </>
    );
};