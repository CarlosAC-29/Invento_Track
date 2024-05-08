'use client'
import React from 'react'
import './styles.css'
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/navbar';

function ListaVendedores() {

  const [vendedores, setVendedores] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:5000/vendedores')
      .then(response => response.json())
      .then(data => setVendedores(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleClick = () => {
    router.push('../usuarios/registro-vendedor');
  };

  const handleEdit = () => {
    router.push('../usuarios/editar-vendedor');
  };

  return (
    <>
      <head>
        <title>Lista de Vendedores</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.ico" />
      </head>
      <body>
        <Navbar />
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5%', marginTop: '2%', color: '#090069' }}>
          <h1>Lista de vendedores</h1>
        </div>

        <div id='operaciones'> 
        {/* <Box className="tarjetas" id='agregarVendedor'>
            <p>Agregar vendedor</p>
          </Box> */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={handleClick} id="botonAgregarVendedor" className="botones" variant="outlined">Agregar vendedor</Button>
            <Box className="tarjetas" id='buscarVendedor'>
              <p>Buscar vendedor</p>
              <TextField className='input' id="inputBuscarVendedor" label="Buscar" variant="outlined" />
              <SearchIcon id='iconoBuscar'/>
            </Box>
          </div>
          
          <div id="listaVendedores">
            {vendedores.map((vendedor, index) => (
              <Box key={index} className="tarjetas" id='vendedores'>
                <div id='nombreVendedor'>
                  <p>Nombre: {vendedor.nombre}</p>
                  <p>Apellido: {vendedor.apellido}</p>
                </div>
                <div id='correoEstadoVendedor'>
                  <p>email: {vendedor.email}</p>
                  <p>Estado: {vendedor.estado}</p>
                </div>
                <div id='accionesVendedor' style={{ display: 'flex', alignItems: 'center' }}>
                  <BorderColorOutlinedIcon id='iconoEditar' onClick={handleEdit}/>
                  <DeleteOutlinedIcon id='iconoEliminar'/>
                </div>
              </Box>
            ))}
          </div>

        </div>
      </body>
    </>
  )
}

export default ListaVendedores