import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { auth, googleprovider, githubprovider } from "../config/firebase-config";
import { useState } from 'react';
import md5 from 'md5';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        ChatRooms
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {

  const navigate = useNavigate();
  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');



  const signInWithEmail = async (e) => {
    try {
      e.preventDefault();
      const payload = {
        userEmail: userEmail
      };
      const response = await fetch('https://northamerica-northeast1-chatroom-cdfc5.cloudfunctions.net/getUserInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const apiData = await response.json();
      const name=apiData.userName;
      const email = apiData.email;
      const profilePicture = apiData.userProfilePic;
      const userMaskName=apiData.userMaskName;
      const userMaskPic=apiData.userMaskPic;
      const apiPasswordHash = apiData.password;
  
      // Hash the user input password using MD5 (make sure you import the MD5 library)
      const hashedUserPassword = md5(userPassword);
  
      // Compare email
      if (userEmail === email) {
        if (apiPasswordHash === null) {
          console.log("User doesn't have a password set in the system.");
          return;
        }
  
        // Compare hashed password
        if (hashedUserPassword === apiPasswordHash) {
          await signInWithEmailAndPassword(auth, userEmail, userPassword);
          console.log("Sign-in successful");
          localStorage.setItem("name",name)
          localStorage.setItem("email",email)
          localStorage.setItem("profilePicture",profilePicture)
          localStorage.setItem("userMaskName",userMaskName)
          localStorage.setItem("userMaskPic",userMaskPic)
          navigate("/home")
          

        } else {
          console.log("Invalid password");
        }
      } else {
        console.log("Invalid email");
      }
    } catch (err) {
      console.log(err);
    }
  };
  
const signInWithGoogle = async (e) => {
    try {
      e.preventDefault();
      const result=await signInWithPopup(auth, googleprovider);
      console.log(result)
      const name= result.user.displayName;
      const email=result.user.email;
      const profilePicture=result.user.photoURL;
  
      localStorage.setItem("name",name)
      localStorage.setItem("email",email)
      localStorage.setItem("profilePicture",profilePicture)
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  }

const signInWithGithub = async (e) => {
    try {
      e.preventDefault();
      const result=await signInWithPopup(auth, githubprovider);
      console.log(result);
      const name= result.user.displayName;
      const email=result.user.email;
      const profilePicture=result.user.photoURL;

      localStorage.setItem("name",name)
      localStorage.setItem("email",email)
      localStorage.setItem("profilePicture",profilePicture)
      navigate("/home");
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://cdn.pixabay.com/animation/2022/11/16/11/48/11-48-15-802_512.gif)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={signInWithEmail}
              >
                Sign In
              </Button>
              
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            <br/>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"  // Add this to make the button larger
                    startIcon={<GoogleIcon/>}
                    onClick={signInWithGoogle}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"  // Add this to make the button larger
                    startIcon={<GitHubIcon  />}
                    onClick={signInWithGithub}
                  />
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}