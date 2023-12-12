import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {FormHelperText, useTheme} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const SignInPage = () => {
    const navigate = useNavigate();
    const theme = useTheme()
    const hideOnSmallScreens = useMediaQuery(theme.breakpoints.down('md'));
    const [serverError, setErrorMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        const data = new FormData(event.currentTarget);
        try {
            // Replace with your API endpoint
            const response = await axios.post('/api/login', {
                identifier: data.get('identifier'),
                password: data.get('password'),
                rememberMe
            });
            const token = response.data.token
            localStorage.setItem('token', token)
            navigate('/')
        } catch (error) {
            setErrorMessage(error.response?.data || 'Login failed. Please try again.');
        }
    };
    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };

    const hasError = serverError !== '';

    return (
        <Grid container component="main" sx={{ height: '100vh', width: '100vw'}}>
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
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="identifier"
                            label="Email Address or Username"
                            name="identifier"
                            autoComplete="username"
                            autoFocus
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
                        />
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={rememberMe} onChange={handleRememberMeChange} name="rememberMe" />}
                            label="Remember Me"
                        />
                        <Grid item xs={12}>
                            {hasError && (
                                <FormHelperText error>{serverError}</FormHelperText>
                            )}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
export default SignInPage;
