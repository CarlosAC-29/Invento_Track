"use client"
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import styles from './styles.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Image from 'next/image';
import vendorIcon from '../../../../../public/images/vendedor-icon.png';
import { decode } from 'base-64'; // Importa la función de decodificación Base64
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
    Box,
    Typography,
    Stack,
    TextField,
    Button
} from '@mui/material';
import { getCliente, editCliente } from '@/app/api/api.routes';
import Link from 'next/link';

export default function EditarVendedor({ searchParams }) {

    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        email: '',
        direccion: '',
        telefono: '',
    });

    
    const { register, handleSubmit, setValue  } = useForm(
        {
            defaultValues: {
                nombre: searchParams.nombre,
                apellido: searchParams.apellido,
                email: searchParams.email,
                direccion: searchParams.direccion,
                telefono: searchParams.telefono,
            }
        }
    )

    const fetchCliente = async () => {
        Swal.fire({
            title: 'Esperando respuesta del servidor...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            button: true,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }})
        const response = await getCliente(searchParams.id)
        console.log(response)   

        setValue('nombre', response.nombre)
        setValue('apellido', response.apellido)
        if (response) {
            Swal.close()
            setCliente(response)
            //reset(response)  // Resetea los valores del formulario con los datos del cliente
        } else {
            Swal.close()
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió un error al cargar la información, por favor intenta de nuevo.',
            });
        }
    }

    

    // useEffect(() => {
    //     fetchCliente()
    // },[])

    const [data, setData] = useState('')

    const [nombreError, setNombreError] = useState('')
    const [apellidoError, setApellidoeError] = useState('')
    const [dirreccionError, setDirreccionError] = useState('')
    const [telefonoError, setTelefonoError] = useState('')
    const [emailError, setEmailError] = useState('')

    const saveData = async (data) => {
        Swal.fire({
            title: 'Esperando respuesta del servidor...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            button: true,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        })

        const response = await editCliente(searchParams.id, data)
        console.log(response)

        if (response) {
            Swal.close()
            Swal.fire({
                title: 'Cliente registrado con éxito',
                icon: 'success',
                confirmButtonText: 'Ok',
            })
        } else {
            Swal.close()
            Swal.fire({
                title: 'Error al registrar el cliente',
                icon: 'error',
                confirmButtonText: 'Ok',
            })
        }
    }

    const processForm = (data) => {
        setData(data);
        console.log(data);

        let isValid = true;

        if (!data.nombre || !data.nombre.length) {
            setNombreError('Campo requerido');
            isValid = false;
        } else {
            setNombreError('');
        }

        if (!data.apellido || !data.apellido.length) {
            setApellidoeError('Campo requerido');
            isValid = false;
        } else {
            setApellidoeError('');
        }

        if (!data.email || !data.email.length) {
            setEmailError('Campo requerido');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!data.telefono || !data.telefono.length) {
            setTelefonoError('Campo requerido');
            isValid = false;
        } else {
            setTelefonoError('');
        }

        if (!data.direccion || !data.direccion.length) {
            setDirreccionError('Campo requerido');
            isValid = false;
        } else {
            setDirreccionError('');
        }

        if (isValid) {
            saveData(data);
        }
    };

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
                <Box sx={{ paddingLeft: '1rem', width: "100%", display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    <Link href="../listas/cliente">
                        <Box  sx={{ cursor: 'pointer', display: 'flex', color: "#fff", justifyContent: "center", alignItems: "center" }}>
                            <ArrowBackIosIcon id='backIcon' />
                            <Typography variant='h6' > Atrás </Typography>
                        </Box>
                    </Link>
                </Box>
                <Box
                    sx={{
                        bgcolor: 'white',

                        borderRadius: '1rem',
                        padding: '2rem 4rem',
                        marginBottom: '1rem'
                    }}
                    xs={12}
                    sm={12}
                    md={10}
                >
                    <form onSubmit={handleSubmit(processForm)}>
                        <Stack
                            direction='column'
                            alignItems="center"
                            justifyContent="center"
                            spacing={2}
                            sx={{ height: '100%', padding: '1rem 0' }}
                        >
                            <Box sx={{ display: 'flex' }}>
                                <Image src={vendorIcon} width={32} alt='worker' />
                                <Typography sx={{
                                    color: '#090069',
                                    fontSize: '1.8rem',
                                    marginLeft: '1rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1rem'
                                }}>
                                    Editar Clientes
                                </Typography>
                            </Box>
                            <TextField
                                error={nombreError && nombreError.length ? true : false}
                                autoFocus
                                size="small"
                                id="nombre"
                                label="Nombre"
                                variant="filled"
                                onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
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
                                error={emailError && emailError.length ? true : false}
                                size="small"
                                id="email"
                                label="Correo Electrónico"
                                variant="filled"
                                {...register('email')}
                                helperText={emailError}
                            />
                            <TextField
                                error={telefonoError && telefonoError.length ? true : false}
                                size="small"
                                id="telefono"
                                label="Telefono"
                                variant="filled"
                                {...register('telefono')}
                                helperText={telefonoError}
                            />
                            <TextField
                                error={dirreccionError && dirreccionError.length ? true : false}
                                size="small"
                                id="confPassowrd"
                                label="Dirección"
                                variant="filled"
                                helperText={dirreccionError}
                                {...register('direccion')}
                            />
                            <Button
                                type='submit'
                                variant="contained"
                                sx={{
                                    backgroundColor: "#090069",
                                    "&:hover": {
                                        backgroundColor: "#1d35f7",
                                    }, color: 'white'
                                }}
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