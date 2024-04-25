"use client"
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import styles from './styles.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Image from 'next/image';
import vendorIcon from '../../../../../public/images/vendedor-icon.png';
import { useForm } from 'react-hook-form';
import {
    Box,
    Typography,
    Stack,
    TextField,
    Button
} from '@mui/material';


export default function EditarVendedor() {

    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                nombre: '',
                apellido: '',
                correo: '',
                contrasena: '',
                confContra: '',
                rol: ''
            }
        }
    )

    const [data, setData] = useState('')

    const [nombreError, setNombreError] = useState('')
    const [apellidoError, setApellidoeError] = useState('')
    const [contrasenaError, setContrasenaError] = useState('')
    const [confContraError, setConfContraError] = useState('')
    const [correoError, setCorreoError] = useState('')
    const [rolError, setRolError] = useState('')

    const saveData = async () => {

        Swal.fire({
            title: 'Esperando respuesta del servidor',
            allowOutsideClick: false,
            timer: 2000,
            allowEscapeKey: false,
            button: true,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        })

        // consumir endpoint para guardar datos
        //y retornar true y despues usar Swal.close()
        // y usar sweet alert de extio

    }

    const processForm = (data) => {

        setData(data)
        console.log(data)

        if (!data.nombre || !data.nombre.length) {
            setNombreError('Campo requerido')
        } else {
            setNombreError('')
        }
        if (!data.apellido || !data.apellido.length) {
            setApellidoeError('Campo requerido')
        } else {
            setApellidoeError('')
        }
        if (!data.correo || !data.correo.length) {
            setCorreoError('Campo requerido')
        } else {
            setCorreoError('')
        }
        if (!data.contrasena || !data.contrasena.length) {
            setContrasenaError('Campo requerido')
        } else {
            setContrasenaError('')
        }
        if (!data.confContra || !data.confContra.length) {
            setConfContraError('Campo requerido')
        } else {
            setConfContraError('')
        }
        if (!data.rol || !data.rol.length) {
            setRolError('Campo requerido')
        } else {
            setRolError('')
        }

        saveData()

    }


    return (
        <div className={styles.main_container}>
            <Stack
            direction='column'
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{
                width: '100%',
                height: '100vh',
            }}
            >
                <Box sx={{paddingLeft: '1rem',width: "100%", display: 'flex', justifyContent: 'left', alignItems:'center' }}>
                    <Box sx={{cursor: 'pointer', display: 'flex'}}>
                    <ArrowBackIosIcon id='backIcon' />
                    <h2 style={{ color: 'white' }}> Atrás </h2>
                    </Box>
                </Box>
                <Box
                    sx={{
                        bgcolor: "white",
                        color: 'white',
                        borderRadius: '1rem',
                        padding: '2rem 4rem',
                      
                        
                    }}
                    xs={12}
                    sm={12}
                    md={8}
                    
                >
                    <form onSubmit={handleSubmit(processForm)}>
                        <Stack
                            direction='column'
                            alignItems="center"
                            justifyContent="center"
                            spacing={2}
                            sx={{  padding: '1rem 0'}}
                           
                        >
                            <Box >
                               
                                <Typography sx={{
                                    color: "#090069",
                                    fontSize: '1.8rem',
                                    marginLeft: '1rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1rem',
                                   
                                }}
                                   
                                
                                >
                                   <Image src={vendorIcon} width={32} />  Editar Vendedor
                                </Typography>
                            </Box>
                            <TextField
                                error={nombreError && nombreError.length ? true : false}
                                autoFocus
                                size="small"
                                id="nombre"
                                label="Nombre"
                                variant="filled"
                                {...register('nombre')}
                                helperText={nombreError}
                                sx={{ height: nombreError && nombreError.length ? 'auto' : '56px' }}

                            />
                            <TextField
                                error={apellidoError && apellidoError.length ? true : false}
                                size="small"
                                id="apellido"
                                label="Apellido"
                                variant="filled"
                                {...register('apellido')}
                                helperText={apellidoError}
                            />
                            <TextField
                                error={correoError && correoError.length ? true : false}
                                size="small"
                                id="correo"
                                label="Correo Electrónico"
                                variant="filled"
                                {...register('correo')}
                                helperText={correoError}
                            />
                            <TextField
                                error={contrasenaError && contrasenaError.length ? true : false}
                                size="small"
                                id="contrasena"
                                label="Contraseña"
                                variant="filled"
                                {...register('contrasena')}
                                helperText={contrasenaError}
                            />
                            <TextField
                                error={confContraError && confContraError.length ? true : false}
                                size="small"
                                id="confContra"
                                label="Confirmar Contraseña"
                                variant="filled"
                                {...register('confContra')}
                                helperText={confContraError}
                            />
                            <TextField
                                error={rolError && rolError.length ? true : false}
                                size="small"
                                id="rol"
                                label="Rol"
                                variant="filled"
                                {...register('rol')}
                                helperText={rolError}
                            />
                            <Button
                                type='submit'
                                variant="contained"
                                sx={{ backgroundColor: "#090069",
                                "&:hover": {
                                  backgroundColor: "#1d35f7",
                                }, color: 'white' }}
                            >
                                Guardar
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </div>
    );
}

