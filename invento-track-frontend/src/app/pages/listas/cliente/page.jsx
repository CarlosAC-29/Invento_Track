'use client'
import React, { useEffect, useState } from 'react'
import './styles.css'
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useForm } from 'react-hook-form';
import { listarClientes } from '@/app/api/api.routes';
import { useRouter } from 'next/navigation';

function ListaClientes() {

  const [clientes, setClientes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:5000/clientes')
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleClick = () => {
    router.push('../usuarios/registro-clientes');
  };

  const handleEdit = () => {
    router.push('../usuarios/editar-clientes');
  };

  
  return (
    <>
      <head>
        <title>Lista de Clientes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.ico" />
      </head>
      <body>
        <Box id="toolbar">
          <ArrowBackIosIcon id='backIcon'/>
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
              InventoTrack <InventoryIcon/>
          </Typography>
          <h4>Bienvenido, admin</h4>
          <AccountCircleOutlinedIcon id='iconoUsuario'/>
        </Box>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5%', marginTop: '2%', color: '#090069' }}>
          <h1>Lista de clientes</h1>
        </div>

        <div id='operaciones'> 

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={handleClick} id="botonAgregarCliente" className="botones" variant="outlined">Agregar cliente</Button>
            <Box className="tarjetas" id='buscarCliente'>
              <p>Buscar cliente</p>
              <TextField className='input' id="inputBuscarCliente" label="Buscar" variant="outlined" />
              <SearchIcon id='iconoBuscar'/>
            </Box>
          </div>

          <div id="listaClientes">
          {clientes.map((cliente, index) => (
            <Box key={index} className="tarjetas" id='clientes'>
              <div id='nombreCliente'>
                <p>Nombre: {cliente.nombre}</p>
                <p>Apellido: {cliente.apellido}</p>
              </div>
              <div id='correoEstadoCliente'>
                <p>email: {cliente.email}</p>
                <p>direccion: {cliente.direccion}</p>
                <p>telefono: {cliente.telefono}</p>
              </div>
              <div id='accionesCliente' style={{ display: 'flex', alignItems: 'center' }}>
                <BorderColorOutlinedIcon id='iconoEditar' onClick={handleEdit} />
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

export default ListaClientes