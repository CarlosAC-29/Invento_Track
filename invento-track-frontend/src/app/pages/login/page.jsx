"use client";
import * as React from "react";
import { useRouter } from 'next/navigation';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CardContent from "@mui/material/CardContent";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useAppContext } from "@/app/context";

import axios from 'axios'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAWrC4NNeZpkbsDnmFM4ZirY3uzJu_GDHA",
  authDomain: "logininventotrack.firebaseapp.com",
  projectId: "logininventotrack",
  storageBucket: "logininventotrack.appspot.com",
  messagingSenderId: "692002139318",
  appId: "1:692002139318:web:c627ac41ca3cc4b1d64a17"
};

const app = initializeApp(firebaseConfig);

// TODO remove, this demo shouldn't need to reset the theme.

export default function Login() {
  const { setUser } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    const auth = getAuth(app);
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Autenticación exitosa", userCredential.user);
        // Aquí realizas tu petición al backend después de la autenticación exitosa
        // Supongamos que quieres hacer una solicitud POST al endpoint '/api/userInfo'
        axios.post('http://localhost:5000/login', {
          email: email, // Por ejemplo, envías el ID de usuario
          // Otros datos que necesites enviar al backend
        })
          .then(response => {
            console.log('Respuesta del backend:', response.data);
            setUser(response.data); // Guarda la respuesta en el contexto de la aplicación
            router.push('/pages/home'); // Redirige a la página de inicio
            // Puedes hacer algo con la respuesta del backend si es necesario
          })
          .catch(error => {
            console.error('Error al hacer la solicitud al backend:', error);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Error durante la autenticación:", errorCode, errorMessage);
      });
  };
  

  return (
    <Grid container justify="center" sx={{height: "100vh" }}>
      <Grid
        container
        justify="center"
        alignItems="center"
        xs={false}
        sm={false}
        md={6}
        sx={{
          backgroundImage: `url(/images/bg.png)`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
         
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={7}
          sx={{
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
            color: "white",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontWeight: "bold", overflowWrap: "break-word" }}
              variant="h2"
              gutterBottom
            >
              InventoTrack
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{ overflowWrap: "break-word" }}
            >
              Welcome to InventoTrack, your ultimate solution for seamlessly
              managing and organizing your inventory. Whether you're a small
              business owner, a warehouse manager, or simply someone who wants
              to stay on top of their belongings, InventoTrack is here to
              streamline the process for you
            </Typography>
          </CardContent>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        component={Paper}
        sx={{ borderRadius: "10px"}}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
          }}
        >
          <Typography
            component="tittle"
            variant="h5"
            sx={{
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Cambia esto por la fuente que prefieras
              fontWeight: "bold", // Hace que el texto sea en negrita
              color: "#090069", // Cambia el color del texto
              fontSize: "2rem", // Cambia el tamaño de la fuente
            }}
          >
            InventoTrack <InventoryIcon />
          </Typography>
          <Typography
            sx={{
              mb: 1.5,
              color: "text.secondary",
              overflowWrap: "break-word",
              marginTop: "10px",
            }}
          >
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 , paddingLeft: "80px", paddingRight: "80px"}}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(169, 169, 169)",
                    borderRadius: "20px",
                    backgroundColor: "rgba(169, 169, 169, 0.2)",
                  },
                  "&.Mui-focused fieldset": {
                    // Añade estas líneas
                    borderColor: "#090069", // Cambia esto por el color que prefieras
                    color: "#090069",
                  },
                },
              }}
              onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(169, 169, 169)",
                    borderRadius: "20px",
                    backgroundColor: "rgba(169, 169, 169, 0.2)",
                  },
                  "&.Mui-focused fieldset": {
                    // Añade estas líneas
                    borderColor: "#090069", // Cambia esto por el color que prefieras
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  sx={{
                    color: "#090069", // Color cuando no está seleccionado
                    "&.Mui-checked": {
                      color: "#090069", // Color cuando está seleccionado
                    },
                  }}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: "20px",
                backgroundColor: "#090069",
                "&:hover": {
                  backgroundColor: "#1d35f7",
                },
              }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  underline="none"
                  sx={{ color: "#090069" }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  underline="none"
                  sx={{ color: "#090069" }}
                >
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
