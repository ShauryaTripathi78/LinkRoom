import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <>
            <div className="navBar">
                <div className="navLeft">
                    <h2>LinkRoom</h2>
                </div>

                <div className="navRight">
                    <IconButton onClick={() => navigate("/history")}>
                        <RestoreIcon />
                    </IconButton>
                    <p>History</p>

                    <Button 
                        onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/auth")
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2>Your space to connect, share, and communicate.</h2>

                        <div className="inputRow">
                            <TextField
                                onChange={e => setMeetingCode(e.target.value)}
                                id="outlined-basic"
                                label="Meeting Code"
                                variant="outlined"
                                fullWidth
                            />
                            <Button 
                                onClick={handleJoinVideoCall}
                                variant='contained'
                                className='joinButton'
                            >
                                Join
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='rightPanel'>
                    <img srcSet='/logo3.png' alt="logo" />
                </div>
            </div>
        </>
    )
}

export default withAuth(HomeComponent)
