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

//https://v0.dev/r/67JR5Lqj6eb https://v0.dev/r/LSA2DRtklDL

export default function RegistrarProducto() {
    const { register, handleSubmit } = useForm();

    const [data, setData] = useState('');
    const [errors, setErrors] = useState({});

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

        // Aquí harías la llamada a tu API
        const response = await new Promise((resolve) =>
            setTimeout(() => resolve({ success: true }), 2000)
        ); // Simulación de la llamada API

        Swal.close();

        if (response.success) {
            Swal.fire({
                title: 'Producto registrado con éxito',
                icon: 'success',
                confirmButtonText: 'Ok',
            });
        } else {
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

        setErrors(newErrors);

        if (isValid) {
            saveData(data);
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
                            <Typography variant="h4">Registrar Producto</Typography>
                            <Typography variant="subtitle1">Ingresa los detalles del nuevo producto</Typography>
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
                                        <MenuItem value="electronics">Electrónica</MenuItem>
                                        <MenuItem value="clothing">Ropa</MenuItem>
                                        <MenuItem value="home">Hogar</MenuItem>
                                        <MenuItem value="sports">Deportes</MenuItem>
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
                                    <CloudUploadIcon style={{ fontSize: '48px', color: '#bdbdbd' }} />
                                    <Typography variant="body1" color="textSecondary">
                                        <span style={{ fontWeight: 'bold' }}>Click para subir</span> o arrastra y suelta
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        SVG, PNG, JPG o GIF (MAX. 800x400px)
                                    </Typography>
                                    <input id="image" type="file" style={{ display: 'none' }} />
                                </label>
                            </Box>
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
