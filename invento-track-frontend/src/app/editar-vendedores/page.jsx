import React from 'react';
import styles from './styles.module.css'
import Image from 'next/image';
import vendorIcon from '../../../public/images/vendedor-icon.png';
import {
    Box,
    Typography,
    Stack,
    TextField,
    Button
} from '@mui/material';


export default function EditarVendedor() {
    return (
        <div className={styles.main_container}>
            <Box
                sx={{
                    bgcolor: '#F6AE2D',
                    height: '100%',
                    width: '40%',
                    borderRadius: '1rem',
                    padding: '2rem 4rem',
                }}
            >
                <Stack
                    direction='column'
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                    sx={{ height: '100%', padding: '2rem 0'}}
                >
                    <Box sx={{ display: 'flex' }}>
                        <Image src={vendorIcon} width={32} />
                        <Typography sx={{
                            color: '#000000',
                            fontSize: '1.8rem',
                            marginLeft: '1rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem'
                        }}>
                            Registro Vendedor
                        </Typography>
                    </Box>
                    <TextField
                        size="small"
                        id="filled-basic"
                        label="Nombre"
                        variant="filled" />
                    <TextField
                        size="small"
                        id="filled-basic"
                        label="Apellido"
                        variant="filled" />
                    <TextField
                        size="small"
                        id="filled-basic"
                        label="Correo Electrónico"
                        variant="filled" />
                    <TextField
                        size="small"
                        id="filled-basic"
                        label="Contraseña"
                        variant="filled" />
                    <TextField
                        size="small"
                        id="filled-basic"
                        label="Confirmar Contraseña"
                        variant="filled" />
                    <TextField
                        size="small"
                        id="filled-basic"
                        label="Rol"
                        variant="filled" />
                    <Button
                        variant="contained"
                        sx={{ bgcolor: '#86BBD8', color: '#1E1E1E' }}
                    >
                        Guardar
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}

