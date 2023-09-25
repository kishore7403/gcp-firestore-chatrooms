import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

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
  const navigate = useNavigate(); // Create a navigate function

  useEffect(() => {
    // Fetching data from localStorage when the component mounts
    const storedName = localStorage.getItem("name");
    const storedProfilePicture = localStorage.getItem("profilePicture");

    if (storedName) setName(storedName);

    // Set the profile picture directly from base64 string
    if (storedProfilePicture) setProfilePicture(storedProfilePicture);
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();

    // Replace the current history entry with /login
    window.history.replaceState(null, "", "/login");

    // Navigate to the /login route
    navigate('/login');
  };

  return (
    <div style={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={styles.title}>
            ChatRooms
          </Typography>
          <Typography>{name}</Typography>
          {profilePicture && <Avatar alt="Profile" src={`data:image/jpeg;base64,${profilePicture}`} style={styles.avatar} />}
          <Button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
