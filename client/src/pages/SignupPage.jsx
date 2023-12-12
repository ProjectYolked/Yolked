import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {FormHelperText, useTheme} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SignupPage = () => {
    const [serverError, setServerError] = useState('');
    const theme = useTheme();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const validate = (data) => {
        let tempErrors = {};
        tempErrors.firstName = data.get('firstName') ? '' : 'First Name is required';
        tempErrors.email = data.get('email').match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) ? '' : 'Email is not valid';
        tempErrors.username = data.get('username') ? '' : 'Username is required';
        tempErrors.password = data.get('password') ? '' : 'Password is required';
        tempErrors.confirm_password = data.get('confirm_password') === data.get('password') ? '' : 'Passwords do not match';
        tempErrors.password = data.get('password').length >= 6 ? '' : 'Password must be at least 6 characters'
        tempErrors.username = data.get('username').length >= 3 ? '' : 'Username must be at least 3 characters'

        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setServerError('');
        const data = new FormData(event.currentTarget);
        if(!validate(data)) {
            return
        }

        let email = data.get('email')
        let username = data.get('username')
        let password= data.get('password')
        let firstName = data.get('firstName')
        let lastName = data.get('lastName')

        try {
            await axios.post('/api/signup', { email, username, password, firstName, lastName });
            navigate('/'); // Redirect to home page after signup
        } catch (error) {
            const errorMsg = error.response?.data || 'An error occurred. Please try again later.';
            setServerError(errorMsg);
        }
    };
    const hasError = serverError !== '';

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // Full height of the viewport
                width: '100vw', // Full width to ensure the Container is centered horizontally
                boxSizing: 'border-box', // Ensures padding and border are included in the width and height
            }}
        >
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
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!errors.username}
                                    helperText={errors.username}
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="new-username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!errors.confirm_password}
                                    helperText={errors.confirm_password}
                                    required
                                    fullWidth
                                    name="confirm_password"
                                    label="Confirm Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {hasError && (
                                    <FormHelperText error>{serverError}</FormHelperText>
                                )}
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" color={theme.palette.primary.main}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default SignupPage;
