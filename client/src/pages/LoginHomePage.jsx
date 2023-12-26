import React, { useState } from 'react';
import {Grid, Button, Typography, Paper, Box, CssBaseline, useTheme, alpha} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import  '../../css/pages/LoginPage.css'
import { useNavigate } from 'react-router-dom';
import SignInForm from "../components/SignInForm.jsx";
import SignUpForm from "../components/SignUpForm.jsx";

const LoginHomePage = () => {
    const [activeForm, setActiveForm] = useState('none');
    const theme = useTheme();
    const hideOnSmallScreens = useMediaQuery(theme.breakpoints.down('md'));


    // Function to toggle to login form
    const showLoginForm = () => {
        setActiveForm('login');
    };
    // Function to toggle to signup form
    const showSignUpForm = () => {
        setActiveForm('signup');
    };

    return (
        <Grid container component="main" sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <CssBaseline />
            {!hideOnSmallScreens && (
                <Grid item md={6} lg={7} sx={{ position: 'relative' }}>
                    {/* Video Background */}
                    <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                        <source src="https://storage.cloud.google.com/yolked-assets/WorkoutMontage.mp4" type="video/mp4" /> {/* TODO migrate to CDN */}
                        Your browser does not support the video tag.
                    </video>

                    {/* Semi-Transparent Overlay */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: alpha(theme.palette.background.default, 0.77)
                        }}
                    />

                    {/* Text in the Top Left Corner */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '24px', // Adjust top and left values as needed
                            left: '32px',
                            zIndex: 2, // Ensure the text is above the overlay and video
                        }}
                    >
                        <Typography variant="h1" color="textSecondary" gutterBottom>
                            Yolked
                        </Typography>
                        {/* Additional content if needed */}
                    </Box>
                </Grid>
            )}
            <Grid item xs={12} sm={12} md={6} lg={5} component={Paper} elevation={6} square>
                {activeForm === 'login' && <SignInForm switchToSignUp={showSignUpForm} />}
                {activeForm === 'signup' && <SignUpForm switchToLogin={showLoginForm} />}
                {activeForm === 'none' &&
                <Box
                    sx={{
                        my: -6.8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                >
                    <Typography variant="h3" color="textPrimary" sx={{ mb: 2 }}>
                        Get Started
                    </Typography>
                    <Box display="flex" alignItems="center" gap={.75}> {/* Adjust the gap value to increase/decrease the space */}
                        <Button variant="contained" color="primary" sx={{ textTransform: 'none', mr: 2,
                            height: 48, width: 214,
                            fontSize: '1rem',
                            fontWeight: 500,
                            fontFamily: '"Roboto", sans-serif' }}
                                onClick={() =>  setActiveForm('login')}>
                            Log in
                        </Button>
                        <Button variant="contained" color="primary" sx={{ textTransform: 'none',
                            height: 48, width: 214,
                            fontSize: '1rem',
                            fontWeight: 500,
                            fontFamily: '"Roboto", sans-serif' }}
                                onClick={() => setActiveForm('signup')}>
                            Sign up
                        </Button>
                    </Box>
                </Box> }
            </Grid>
        </Grid>
    );
};

export default LoginHomePage;
