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
  
const useStyles = makeStyles({
    root: {
        width: '800px',
        height: '380px'
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
    const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
    const [client, setClient] = useState(null);
    const navigate = useNavigate();
    const classes = useStyles();

    const toggleEditPopup = () => {
        setEditPopupIsOpen(!editPopupIsOpen);
    };

    const handlePopupClose = () => {
        setEditPopupIsOpen(false);
    };

    useEffect(() => {
        if (!localStorage.getItem('access-token')) {
            navigate('/');
        }

    }, [navigate]);

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
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h6" component="h2" style={{marginBottom: '10px'}}>
                            Hello name surname {client?.name} {client?.surname}
                        </Typography>     
                        <div style={{float: 'left'}}>
                            <Card style={{width: '250px'}}>
                                <CardContent>
                                    <Typography className={classes.pos} color="initial">
                                        <IconContext.Provider value={{ size: '1.2em', style: { verticalAlign: 'middle' }}}>
                                            <CgProfile />
                                        </IconContext.Provider>
                                        username
                                    </Typography>
                                    <Typography className={classes.pos} color="initial">
                                        <IconContext.Provider value={{ size: '1.2em', style: { verticalAlign: 'middle' }}}>
                                            <CiMail />
                                        </IconContext.Provider>
                                        test@gmail.com
                                    </Typography>
                                    <Typography className={classes.pos} color="initial">
                                        <IconContext.Provider value={{ size: '1.2em'}}>
                                        <CiPhone/>
                                        </IconContext.Provider>
                                        8686868686 {client?.phoneNumber}
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
                <div style={{float: 'right', width: '900px'}}>
                    <Button
                    value="Edit information"
                    name="profile-edit-button"
                    onClick={() => toggleEditPopup()}
                    style={{
                        marginTop: '10px'
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
                />
            }

            <Footer>
            </Footer>
        </>
    );
};