"use client";

import { Box, Typography, useTheme, useMediaQuery, IconButton, Menu, MenuItem, Button } from '@mui/material'
import React, { useState } from 'react'
import { useAppContext } from "@/app/context";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import './styles.css'

function Navbar({ atras }) {

  const { user, setUser } = useAppContext();


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter(); // Utiliza useRouter para redirigir después de cerrar sesión

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setUser({ userID: null, rol: null });
    router.push('/');

  };

  return (
    <Box id="toolbar">
      <Link href={atras}>
        <ArrowBackIosIcon id='backIcon' />
      </Link>
      <Typography
        component="tittle"
        variant="h5"
        sx={{
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Cambia esto por la fuente que prefieras
          fontWeight: "bold", // Hace que el texto sea en negrita
          color: "#ffffff", // Cambia el color del texto
          fontSize: "2rem", // Cambia el tamaño de la fuente
          pointerEvents: "none",
          position: "absolute",
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        {isMobile ? 'IT' : 'InventoTrack'} <InventoryIcon />
      </Typography>
      <h4>{isMobile ? '' : "Bienvenido"}</h4>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AccountCircleOutlinedIcon id='iconoUsuario' />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}

export default Navbar;
