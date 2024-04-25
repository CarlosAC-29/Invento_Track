'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InventoryIcon from '@mui/icons-material/Inventory';

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAWrC4NNeZpkbsDnmFM4ZirY3uzJu_GDHA",
    authDomain: "logininventotrack.firebaseapp.com",
    projectId: "logininventotrack",
    storageBucket: "logininventotrack.appspot.com",
    messagingSenderId: "692002139318",
    appId: "1:692002139318:web:c627ac41ca3cc4b1d64a17"
};
  
const app = initializeApp(firebaseConfig);


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const handleSubmit = async (event) => {
        console.log('HandleSubmit')
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        try {
            await register(email, password);
        } catch (error) {
            console.error('Error durante el registro:', error.message);
        }
    };

    const register = async (email, password) => {
        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Usuario registrado con éxito
            console.log('Usuario registrado: ', userCredential.user);
            // Aquí puedes redirigir a otra página o realizar otras acciones después del registro exitoso
        } catch (error) {
            // Si hay un error durante el registro
            console.error('Error de registro:', error.message);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#00000000', color: "#090069"}}>
                        <InventoryIcon fontSize='100px'/>
                    </Avatar>
                    <Typography xs={{}} component="h1" variant="h6">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderRadius: '20px', // Change this to the desired radius
                                        },
                                        '& .MuiInputLabel-root': {
                                            fontSize: '14px', // Cambia el tamaño de la letra del label
                                        }
                                    }}
                                    InputLabelProps={
                                        {
                                            fontSize: "small"
                                        }
                                    }

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
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderRadius: '20px', // Change this to the desired radius
                                        },
                                        '& .MuiInputLabel-root': {
                                            fontSize: '14px', // Cambia el tamaño de la letra del label
                                        }
                                    }}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderRadius: '20px', // Change this to the desired radius
                                        },
                                        '& .MuiInputLabel-root': {
                                            fontSize: '14px', // Cambia el tamaño de la letra del label
                                        }
                                    }}
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
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderRadius: '20px', // Change this to the desired radius
                                        },
                                        '& .MuiInputLabel-root': {
                                            fontSize: '14px', // Cambia el tamaño de la letra del label
                                        }
                                    }}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <FormControlLabel
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            fontFamily: 'Segoe UI', // Cambia el tamaño de la letra del label
                                        }
                                    }}
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3, mb: 2, backgroundColor: "#090069", textTransform: "none",
                                fontFamily: "Segoe UI",
                                "&:hover": {
                                    backgroundColor: "#1d35f7",
                                },
                            }}
                            endIcon={<ArrowForwardIcon />}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}