"use client"
import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, TextField, Button, Autocomplete, Divide, Autocompleter } from '@mui/material';
import { listarClientes, getProductos, registrarPedido } from '@/app/api/api.routes';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import styles from './styles.module.css';






export default function SpeechToText() {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [clientes, setClientes] = useState("");
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null); // Estado para almacenar el cliente seleccionado
    const [infoObtenida, setInfoObtenida] = useState(false);


    const { register, handleSubmit, setValue } = useForm(
        {
            defaultValues: {
                id_cliente: '',
                text: '',
            }
        }
    )

    const handleClick = () => {
        // Tu lógica para redirigir al usuario
    };

    const getInfo = async () => {
        Swal.fire({
            title: 'Esperando respuesta del servidor...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            button: true,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        try {
            const responseClientes = await listarClientes();
            setClientes(responseClientes);
            setInfoObtenida(true);
            Swal.close();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrió un error al cargar la información, por favor intenta de nuevo.',
            });
        }
    };

    useEffect(() => {
        if (!infoObtenida) {
            getInfo();
        }

        if (clienteSeleccionado) {
            setValue('id_cliente', clienteSeleccionado); // Asignar el id del cliente seleccionado al campo id_cliente
        }
        setValue('text', transcript);
    }, [clienteSeleccionado, setValue, transcript]);

    const startListening = () => {
        setIsListening(true);
        const recognition = new window.webkitSpeechRecognition(); // Para Chrome
        //const recognition = new window.SpeechRecognition(); // Para otros navegadores
        recognition.onstart = () => console.log('Voice recognition started');
        recognition.onresult = event => {
            const currentTranscript = event.results[0][0].transcript;
            setTranscript(prevTranscript => prevTranscript + ' ' + currentTranscript);
        };
        recognition.onend = () => {
            setIsListening(false);
            console.log('Voice recognition stopped');
        };
        recognition.start();
    };

    const stopListening = () => {
        setIsListening(false);
        console.log('Voice recognition stopped manually');
    };

    const handleClienteChange = (event, value) => {
        event.preventDefault();
        const { id } = value;
        setClienteSeleccionado(id);
    };

    const validateFields = () => {
        if (!clienteSeleccionado || !transcript.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor, seleccione un cliente y grabe un audio para procesar el pedido.',
            });
            return false;
        }
        return true;
    };

    const processPedido = (data) => {
        if (!validateFields()) {
            return;
        }
        console.log(data);
        setValue('text', transcript);
    };

    return (
        <div className={styles.main_container}>
            <Box sx={{ paddingLeft: '1rem', width: "100%", display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                <Box onClick={handleClick} sx={{ cursor: 'pointer', display: 'flex', color: "#fff", justifyContent: "center", alignItems: "center" }}>
                    <ArrowBackIosIcon id='backIcon' />
                    <Typography variant='h6'> Atrás </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <form onSubmit={handleSubmit(processPedido)}>
                    <Stack spacing={2} direction={"column"} sx={{ background: "#fff", padding: "3rem", borderRadius: "1rem" }}>
                        <Typography sx={{ color: "#001D60", fontSize: "30px", fontWeight: "bold", textAlign: "center" }}><SpatialAudioOffIcon /> Speech to Pedido</Typography>
                        <Autocomplete
                            disablePortal
                            disableClearable
                            id="combo-box-demo"
                            options={clientes}
                            getOptionLabel={(option) => `${option.nombre} (${option.id})`}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            sx={{ width: 300 }}
                            onChange={handleClienteChange}
                            renderInput={(params) => <TextField {...params} label="Clientes" />}
                        />
                        <Button sx={{
                            backgroundColor: isListening ? "#CE3030" : "#2B9E00",
                            '&:hover': {
                                backgroundColor: isListening ? "#922222" : "#237803",
                            }
                        }} variant='contained' onClick={isListening ? stopListening : startListening}>
                            {isListening ? 'Denter' : 'Grabar'}
                        </Button>
                        <Button variant='contained' type='submit'>Procesar Pedido</Button>
                    </Stack>
                </form>
            </Box>
        </div>
    );
};



