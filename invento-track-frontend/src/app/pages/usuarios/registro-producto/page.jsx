'use client'
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';
import {
    Box,
    Typography,
    Stack,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { registrarProducto } from '@/app/api/api.routes';
import Link from 'next/link';


export default function RegistrarProducto() {
    const { register, handleSubmit, setValue } = useForm();

    const [data, setData] = useState('');
    const [errors, setErrors] = useState({});
    const [imageURL, setImageURL] = useState('');
    const [uploadError, setUploadError] = useState(false);

    const saveData = async (data) => {
        Swal.fire({
            title: 'Esperando respuesta del servidor...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            button: true,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });


        const response = await registrarProducto(data)
        console.log("XD",response)

        Swal.close();

        if (response) {
            console.log("what")
            Swal.fire({
                title: 'Producto registrado con éxito',
                icon: 'success',
                confirmButtonText: 'Ok',
            });
        } else {
            console.log("entré?")
            Swal.fire({
                title: 'Error al registrar el producto',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
        }
    };

    const processForm = (data) => {
        setData(data);
        console.log(data);

        let isValid = true;
        const newErrors = {};

        if (!data.nombre) {
            newErrors.nombre = 'Campo requerido';
            isValid = false;
        }

        if (!data.precio) {
            newErrors.precio = 'Campo requerido';
            isValid = false;
        }

        if (!data.stock) {
            newErrors.stock = 'Campo requerido';
            isValid = false;
        }

        if (!data.categoria) {
            newErrors.categoria = 'Campo requerido';
            isValid = false;
        }

        if (!data.descripcion) {
            newErrors.descripcion = 'Campo requerido';
            isValid = false;
        }

        if (!data.referencia) {
            newErrors.referencia = 'Campo requerido';
            isValid = false;

        }

        if (!imageURL) {
            newErrors.imagen = 'Imagen requerida';
            isValid = false;
        } else {
            data.imagen = imageURL;
        }

        setErrors(newErrors);

        if (isValid) {
            saveData(data);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ankiqjsc');

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dm6kc0kyr/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );
            
            const imageUrl = await response.json();
            setImageURL(imageUrl.secure_url);
            setValue('image', imageUrl);
            setUploadError(false);
            Swal.fire({
                title: 'Imagen subida con éxito',
                icon: 'success',
                confirmButtonText: 'Ok',
            });
        } catch (error) {
            console.error('Error subiendo la imagen:', error);
            setUploadError(true);
            Swal.fire({
                title: 'Error al subir la imagen. Intentelo de nuevo',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
        }
    };


    return (
        <div className={styles.main_container}>
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                sx={{
                    width: '100%',
                    height: '100vh',
                }}
            >
                <Box sx={{ paddingLeft: '1rem', width: "100%", display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    <Link href='../listas/productos'>
                        <Box sx={{ cursor: 'pointer', display: 'flex', color: "#fff", justifyContent: "center", alignItems: "center" }}>
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
                        marginBottom: '1rem',
                        width: '100%',
                        maxWidth: '600px',
                    }}
                >
                    <form onSubmit={handleSubmit(processForm)}>
                        <Stack direction="column" spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                                <Typography sx={{
                                        color: '#090069',
                                        fontSize: '1.8rem',
                                        fontWeight: 'bold',
                                    }}>
                                    Registrar Producto
                                </Typography>
                            </Box>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="Nombre"
                                    variant="filled"
                                    fullWidth
                                    {...register('nombre')}
                                    error={Boolean(errors.nombre)}
                                    helperText={errors.nombre}
                                />
                                <TextField
                                    label="Precio"
                                    variant="filled"
                                    type="number"
                                    fullWidth
                                    {...register('precio')}
                                    error={Boolean(errors.precio)}
                                    helperText={errors.precio}
                                />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="Stock"
                                    variant="filled"
                                    type="number"
                                    fullWidth
                                    {...register('stock')}
                                    error={Boolean(errors.stock)}
                                    helperText={errors.stock}
                                />
                                <FormControl variant="filled" fullWidth error={Boolean(errors.categoria)}>
                                    <InputLabel id="categoria-label">Categoría</InputLabel>
                                    <Select
                                        labelId="categoria-label"
                                        defaultValue=""
                                        {...register('categoria')}
                                    >
                                        <MenuItem value="Lacteos">Lacteos</MenuItem>
                                        <MenuItem value="Carnes">Carnes</MenuItem>
                                        <MenuItem value="Frutas">Frutas</MenuItem>
                                        <MenuItem value="Verduras">Verduras</MenuItem>
                                        <MenuItem value="Utiles">Utiles</MenuItem>
                                    </Select>
                                    {errors.categoria && (
                                        <Typography variant="caption" color="error">
                                            {errors.categoria}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Stack>
                            <TextField
                                label="Descripción"
                                variant="filled"
                                multiline
                                rows={4}
                                fullWidth
                                {...register('descripcion')}
                                error={Boolean(errors.descripcion)}
                                helperText={errors.descripcion}
                            />
                            <TextField
                                label="Referencia"
                                variant="filled"
                                fullWidth
                                {...register('referencia')}
                                error={Boolean(errors.referencia)}
                                helperText={errors.referencia}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '200px',
                                    border: '2px dashed grey',
                                    borderRadius: '8px',
                                    bgcolor: '#f5f5f5',
                                    cursor: 'pointer',
                                    marginY: 2,
                                    '&:hover': {
                                        bgcolor: '#eeeeee',
                                    },
                                }}
                            >
                                <label
                                    htmlFor="image"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        height: '100%',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {imageURL ? (
                                        <img src={imageURL} alt="Uploaded" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                                    ) : (
                                        <>
                                            <CloudUploadIcon style={{ fontSize: '48px', color: '#bdbdbd' }} />
                                            <Typography variant="body1" color="textSecondary">
                                                <span style={{ fontWeight: 'bold' }}>Click para subir</span> o arrastra y suelta
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                SVG, PNG, JPG o GIF (MAX. 800x400px)
                                            </Typography>
                                        </>
                                    )}
                                    <input id="image" type="file" style={{ display: 'none' }} onChange={handleImageUpload} />                               
                                </label>
                            </Box>
                            {errors.imagen && (
                                <Typography variant="caption" color="error">
                                    {errors.imagen}
                                </Typography>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#090069',
                                    '&:hover': {
                                        backgroundColor: '#1d35f7',
                                    },
                                    color: 'white',
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
