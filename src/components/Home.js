import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

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
};

function Navbar() {
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

      {room ?(
        <div>chat</div>
        ):(
        <div className='room'>
            <label>Enter room</label>
            <input ref={roomInputRef}/>
            <button onClick={()=> setRoom(roomInputRef.current.value)}>Enter Chat</button>
          </div> 
        )}
    </div>
  );
}

export default Navbar;
