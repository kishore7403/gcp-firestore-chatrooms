import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleprovider, githubprovider } from "../config/firebase-config";
import { useState } from 'react';
import md5 from 'md5';

import FormControl from '@mui/material/FormControl';

function SignUp() {
  const navigate = useNavigate();
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [userUserName, setFirstName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const handleProfilePictureChange = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64Image = event.target.result.split(',')[1];
      setProfilePicture(base64Image);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const signInWithEmail = async (e) => {
    try {
      e.preventDefault();

      const hashedPassword = md5(userPassword);

      const result = await createUserWithEmailAndPassword(auth, userEmail, userPassword);

      const userData = {
        userUserName,
        userEmail,
        userPassword: hashedPassword,
        userProfilePic: profilePicture,
      };

      await fetch('https://northamerica-northeast1-chatroom-cdfc5.cloudfunctions.net/storeUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log(result);
      navigate("/login");
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  }

  const signInWithGoogle = async (e) => {
    try {
      e.preventDefault();
      const result = await signInWithPopup(auth, googleprovider);
      console.log(result);

      const name = result.user.displayName;
      const email = result.user.email;
      const profilePicture = result.user.photoURL;

      const userData = {
        userEmail: email,
        userUserName: name,
        userProfilePic: profilePicture,
      };

      await fetch('https://northamerica-northeast1-chatroom-cdfc5.cloudfunctions.net/storeUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePicture", profilePicture);

      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  }

  const signInWithGithub = async (e) => {
    try {
      e.preventDefault();
      const result = await signInWithPopup(auth, githubprovider);
      console.log(result);

      const name = result.user.displayName;
      const email = result.user.email;
      const profilePicture = result.user.photoURL;

      const userData = {
        userEmail: email,
        userUserName: name,
        userProfilePic: profilePicture,
      };

      await fetch('https://northamerica-northeast1-chatroom-cdfc5.cloudfunctions.net/storeUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePicture", profilePicture);

      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  }

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="User-name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                <Typography>Profile Picture</Typography>
                  <input
                    type="file"
                    accept="image/*"
                    id="profile-picture"
                    onChange={(e) => handleProfilePictureChange(e.target.files[0])}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={signInWithEmail}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <br/>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={<GoogleIcon />}
                  onClick={signInWithGoogle}
                >

                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={<GitHubIcon />}
                  onClick={signInWithGithub}
                >
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
