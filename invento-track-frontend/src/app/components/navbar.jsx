import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import './styles.css'

function Navbar() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        
        <Box id="toolbar">
            <ArrowBackIosIcon id='backIcon' />
            <Typography
                component="tittle"
                variant="h5"
                sx={{
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Cambia esto por la fuente que prefieras
                    fontWeight: "bold", // Hace que el texto sea en negrita
                    color: "#ffffff", // Cambia el color del texto
                    fontSize: "2rem", // Cambia el tamaño de la fuente
                    position: "absolute",
                    pointerEvents: "none",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                }}
            >
                {isMobile ? 'IT' : 'InventoTrack'} <InventoryIcon />
            </Typography>
            <h4>{isMobile ? '' : "Bienvenido, admin"}</h4>
            <AccountCircleOutlinedIcon id='iconoUsuario' />
        </Box>
    )
}

export default Navbar