import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Chat } from './Chat';

const styles = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    marginLeft: '16px',
  },
  logoutButton: {
    border: '1px solid white',
    color: 'white',
    marginLeft: '1rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px', 
  },
  privateChatHeading: {
    marginTop: 'auto',
    height: '100%',
    marginLeft: '45%'
  },
};

function Selectroom() {
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [room,setRoom]=useState("");

  const roomInputRef=useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching data from localStorage when the component mounts
    const storedName = localStorage.getItem("name");
    const storedProfilePicture = localStorage.getItem("profilePicture");

    if (storedName) setName(storedName);

    // Check if the storedProfilePicture is a valid URL
    if (isValidURL(storedProfilePicture)) {
      setProfilePicture(storedProfilePicture);
    } else {
      // Assume it's a base64 encoded image and decode it
      if (storedProfilePicture) {
        setProfilePicture(`data:image/jpeg;base64,${storedProfilePicture}`);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();

    // Replace the current history entry with /login
    window.history.replaceState(null, "", "/login");

    // Navigate to the /login route
    navigate('/login');
  };

  const navigateToHome = () => {
    // Use the navigate function to navigate to the '/selectroom' route
    navigate('/home');
  };



  // Function to check if a string is a valid URL
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div style={styles.root}>
      <div className='navbar'>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={styles.title}>
            ChatRooms
          </Typography>
          <Typography>{name}</Typography>
          {profilePicture && (
            <Avatar alt="Profile" src={profilePicture} style={styles.avatar} />
          )}
          <Button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      </div>
     
      <div >
      
  {room ? (
    <div>
        <div style={styles.privateChatHeading}>
        <h1>Room "{room}"</h1>
      </div>
      <Chat room={room}/>
      <div style={styles.buttonContainer}>
        {/* Button to navigate to the '/selectroom' route */}
        <Button variant="contained" color="primary" onClick={navigateToHome}>
          Go to global chat
        </Button>
      </div>
    </div>
  ) : (
    <div className='room' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent:'center',minHeight: '100vh' }}>
      <h2 style={{margin: '16px'}}>Create / Enter room ID</h2>
      <input  style={{margin: '16px'}} ref={roomInputRef}/>
      <Button  style={{margin: '16px'}} variant="contained" color="primary" onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</Button>
    </div> 
  )}
</div>

    </div>
    
  );
}

export default Selectroom;
