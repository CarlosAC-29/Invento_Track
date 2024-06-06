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
import { registarVendedor } from '@/app/api/api.routes';
import { Password } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import Navbar from '@/app/components/navbar';

const firebaseConfig = {
    apiKey: "AIzaSyAWrC4NNeZpkbsDnmFM4ZirY3uzJu_GDHA",
    authDomain: "logininventotrack.firebaseapp.com",
    projectId: "logininventotrack",
    storageBucket: "logininventotrack.appspot.com",
    messagingSenderId: "692002139318",
    appId: "1:692002139318:web:c627ac41ca3cc4b1d64a17"
  };
  
const app = initializeApp(firebaseConfig);

export default function EditarVendedor() {

    const { register, handleSubmit} = useForm(
        {
            defaultValues: {
                nombre: '',
                apellido: '',
                email: '',
                password: '',
                confPassword: ''
            }
        }
    )

    const handleClick = () => {
        router.push('../listas/vendedor');
      };

    const router = useRouter();

    const [data, setData] = useState('')

    const [nombreError, setNombreError] = useState('')
    const [apellidoError, setApellidoeError] = useState('')
    const [passowordError, setPasswordError] = useState('')
    const [confPasswordError, setConfPasswordError] = useState('')
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

        const response = await registarVendedor(data)
        
        //Firebase
        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            // Usuario registrado con éxito
            console.log('Usuario registrado:', userCredential.user);
            // Aquí puedes redirigir a otra página o realizar otras acciones después del registro exitoso
        } catch (error) {
            // Si hay un error durante el registro
            console.error('Error de registro:', error.message);
        }

        console.log(response)

        if(response){
            Swal.close()
            Swal.fire({
                title: 'Vendedor registrado con éxito',
                icon: 'success',
                confirmButtonText: 'Ok',
            })
        }else{
            Swal.close()
            Swal.fire({
                title: 'Error al registrar el vendedor',
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
    
        if (!data.password || !data.password.length || data.password.length < 8) {
            setPasswordError('Campo requerido');
            if(data.password.length < 8){
                setPasswordError('Contraseña tener min 8 caracteres');
            }
            isValid = false;
        } else {
            setPasswordError('');
        }
    
        if (!data.confPassword || !data.confPassword.length || data.confPassword !== data.password) {
            setConfPasswordError('Campo requerido');
            if(data.confPassword !== data.password){
                setConfPasswordError('Las contraseñas no coinciden');
            }
            isValid = false;
        } else {
            setConfPasswordError('');
        }
    
        if (isValid) {
            saveData(data);
        }
    };
    

    return (
        <div>
            <Navbar atras={'../listas/vendedor'} />
       
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
                                    Registro Vendedor
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
                                error={emailError && emailError.length ? true : false}
                                size="small"
                                id="email"
                                label="Correo Electrónico"
                                variant="filled"
                                {...register('email')}
                                helperText={emailError}
                            />
                            <TextField
                                error={passowordError && passowordError.length ? true : false}
                                size="small"
                                id="password"
                                label="Contraseña"
                                variant="filled"
                                {...register('password')}
                                helperText={passowordError}
                            />
                            <TextField
                                error={confPasswordError && confPasswordError.length ? true : false}
                                size="small"
                                id="confPassowrd"
                                label="Confirmar Contraseña"
                                variant="filled"
                                helperText={confPasswordError}
                                {...register('confPassword')}
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
        </div>
    );
}

