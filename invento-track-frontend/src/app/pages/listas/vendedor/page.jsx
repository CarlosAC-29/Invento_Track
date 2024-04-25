import React from 'react'
import '../listas.css'
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function ListaVendedores() {


    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>

                <div id="atras" style={{ display: 'flex', alignItems: 'center' }}>
                    <ArrowBackIosIcon id='backIcon' />
                    <h2 style={{ color: '#F6AE2D' }}> Atrás </h2>
                </div>

                <Box className="tarjetas" id='bienvenidaUser'>
                    <h2>Bienvenido, admin</h2>
                </Box>
            </div>

            <div id='operaciones'>
                {/* <Box className="tarjetas" id='agregarVendedor'>
            <p>Agregar vendedor</p>
          </Box> */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button id="botonAgregarVendedor" className="botones" variant="outlined">Agregar vendedor</Button>
                    <Box className="tarjetas" id='buscarVendedor'>
                        <p>Buscar vendedor</p>
                        <TextField className='input' id="inputBuscarVendedor" label="Buscar" variant="filled" size="small" />
                        <SearchIcon id='iconoBuscar' />
                    </Box>
                </div>
                <div>
                    <Box className="tarjetas" id='vendedores'>
                        <div id='nombreVendedor'>
                            <p>Nombre: Cristian</p>
                            <p>Apellido: Montaño</p>
                        </div>
                        <div id='correoEstadoVendedor'>
                            <p>correo: cristian@gmail.com</p>
                            <p>Estado: ACTIVO</p>
                        </div>
                        <div id='accionesVendedor' style={{ display: 'flex', alignItems: 'center' }}>
                            <BorderColorOutlinedIcon id='iconoEditar' />
                            <DeleteOutlinedIcon id='iconoEliminar' />
                        </div>
                    </Box>
                </div>
            </div>
        </div>
    )
}