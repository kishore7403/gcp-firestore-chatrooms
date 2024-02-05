import React, { useState, useEffect} from 'react';
import { AppBar, Toolbar, Typography, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Chat } from './Chat';


const styles = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  avatar: {
    marginLeft: '1rem',
  },
  logoutButton: {
    border: '1px solid white',
    color: 'white',
    marginLeft: '1rem',
    fontSize: '1rem'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem', 
  },
  globalChatHeading: {
    marginTop: 'auto',
    height: '100%',
    marginLeft: '45%',
    fontSize: '0.8rem'
  },
  nameText: {
    fontSize: '1rem', 
  }

};

function Home() {
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
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

  const navigateToSelectRoom = () => {
    // Use the navigate function to navigate to the '/selectroom' route
    navigate('/selectroom');
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
          <Typography style={styles.nameText}>{name}</Typography>
          {profilePicture && (
            <Avatar alt="Profile" src={profilePicture} style={styles.avatar} />
          )}
          <Button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      </div>

      <Typography style={styles.globalChatHeading}>
        <h1>Global Chat</h1>
      </Typography>
      <div>
      <div><Chat room="1357"/></div>
      </div>

      <div style={styles.buttonContainer}>
        {/* Button to navigate to the '/selectroom' route */}
        <Button variant="contained" color="primary" onClick={navigateToSelectRoom}>
          Create / Enter Room
        </Button>
      </div>
    </div>
  );
}

export default Home;