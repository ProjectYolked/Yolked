import React, { useState } from 'react';
import {Grid, Button, Typography, Paper, Box, CssBaseline, GlobalStyles} from '@mui/material';
import {ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import  '../../css/pages/LoginPage.css'
import { useNavigate } from 'react-router-dom';
import theme from "../utils/theme.js";


const LoginHomePage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const hideOnSmallScreens = useMediaQuery(theme.breakpoints.down('md'));

    const globalStyles = (
        <GlobalStyles styles={{
            body: {
                margin: 0,
                overflow: 'hidden', // be cautious with this to avoid clipping content
            },
            html: {
                boxSizing: 'border-box',
            },
            '*, *::before, *::after': {
                boxSizing: 'inherit',
            },
        }} />
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const { data } = await axios.post('/api/login', { username, password });
            localStorage.setItem('token', data.token);
            navigate('/'); // Redirect to home page after login
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage('Incorrect username or password');
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            {globalStyles}
            <Grid container component="main" sx={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
                <CssBaseline />
                {!hideOnSmallScreens && (
                    <Grid item md={6} lg={7} sx={{ backgroundColor: theme.palette.background.default }}>
                        <Box
                            sx={{
                                my: 3,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            {/* Changed Typography to use color from the theme */}
                            <Typography variant="h1" color="textSecondary" gutterBottom>
                                Yolked
                            </Typography>
                            {/* Place for more content or decorative elements */}
                        </Box>
                    </Grid>
                )}
                <Grid item xs={12} sm={12} md={6} lg={5} component={Paper} elevation={6} square>
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
                                fontFamily: '"Roboto", sans-serif' }}>
                                Log in
                            </Button>
                            <Button variant="contained" color="primary" sx={{ textTransform: 'none',
                                height: 48, width: 214,
                                fontSize: '1rem',
                                fontWeight: 500,
                                fontFamily: '"Roboto", sans-serif' }}>
                                Sign up
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default LoginHomePage;
