"use client"
import React, { useState, useEffect  } from 'react';
import { Box, Typography, Stack, TextField, Button, Autocomplete, Divider } from '@mui/material';
import styles from './styles.module.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useForm } from 'react-hook-form';

export default function RegistroPedido() {
    const [productosAgregados, setProductosAgregados] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null); // Estado para almacenar el cliente seleccionado


    const { register, handleSubmit, setValue} = useForm(
        {
            defaultValues: {
                id_cliente: '',
                productos: productosAgregados,
                total_pedido: '',
            }
        }
    )

    const handleClienteChange = (event, value) => {
        setClienteSeleccionado(value); // Almacenar el cliente seleccionado en el estado
    };

    useEffect(() => {
        setValue('productos', productosAgregados.map(producto => ({ id_producto: producto.referencia, cantidad_producto: producto.cantidad })));
        setValue('total_pedido', productosAgregados.reduce((total, producto) => total + producto.valorTotal, 0));
        if (clienteSeleccionado) {
            setValue('id_cliente', clienteSeleccionado.value); // Asignar el id del cliente seleccionado al campo id_cliente
        }
    }, [productosAgregados, clienteSeleccionado, setValue]);

    const Clientes = [
        { id: 1, value: 1, label: 'Carlos' },
        { id: 2, value: 2, label: 'Camilo' },
        { id: 3, value: 3, label: 'Luis' }
    ];

    const Productos = [
        { id: 1, value: 1, label: 'Agua', precio: 2000 },
        { id: 2, value: 2, label: 'Gaseosa', precio: 3000 },
        { id: 3, value: 3, label: 'Bombon', precio: 500 }
    ];

    const processForm = (data) => {
        console.log(data);
    }

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleCantidadChange = (event, index) => {
        const { value } = event.target;
        const nuevosProductos = productosAgregados.map((producto, i) => {
            if (i === index) {
                const valorTotal = producto.valorUnitario * value;
                return { ...producto, cantidad: value, valorTotal };
            }
            return producto;
        });
        setProductosAgregados(nuevosProductos);
    }



    const handleDeleteProducto = (index) => {
        setProductosAgregados(productosAgregados.filter((producto, i) => i !== index));
    };

    const truncateText = (text) => {
        if (text.length > 10) {
            return text.substring(0, 10) + '...';
        } else {
            return text;
        }
    };

    const handleAddProducto = (productoSeleccionado) => {
        const productoExistenteIndex = productosAgregados.findIndex(producto => producto.referencia === productoSeleccionado.label);
        if (productoExistenteIndex !== -1) {
            // Si el producto ya existe, aumentar la cantidad en 1
            const nuevosProductos = [...productosAgregados];
            nuevosProductos[productoExistenteIndex].cantidad += 1;
            nuevosProductos[productoExistenteIndex].valorTotal = nuevosProductos[productoExistenteIndex].cantidad * nuevosProductos[productoExistenteIndex].valorUnitario;
            setProductosAgregados(nuevosProductos);
        } else {
            // Si el producto no existe, agregarlo con cantidad 1
            const nuevoProducto = {
                referencia: productoSeleccionado.id,
                producto: productoSeleccionado.label,
                valorUnitario: productoSeleccionado.precio,
                cantidad: 1,
                valorTotal: productoSeleccionado.precio
            };
            setProductosAgregados([...productosAgregados, nuevoProducto]);
        }
    };

    const handleClick = () => {
        // Tu lógica para redirigir al usuario
    };


    // Calcular el valor total general
    const valorTotalGeneral = productosAgregados.reduce((total, producto) => total + producto.valorTotal, 0);

    return (
        <div className={styles.main_container}>
            <Stack direction='column' alignItems="center" spacing={2} sx={{ width: '100%', height: '100vh' }}>
                <Box sx={{ paddingLeft: '1rem', width: "100%", display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    <Box onClick={handleClick} sx={{ cursor: 'pointer', display: 'flex', color: "#fff", justifyContent: "center", alignItems: "center" }}>
                        <ArrowBackIosIcon id='backIcon' />
                        <Typography variant='h6'> Atrás </Typography>
                    </Box>
                </Box>
                <Box sx={{ width: "100%", bgcolor: 'white', padding: '2rem 4rem', marginBottom: '1rem' }}>
                    <form onSubmit={handleSubmit(processForm)}>
                        <Stack spacing={2} direction={'row'} justifyContent="space-between">
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={Clientes}
                                getOptionLabel={(option) => `${truncateText(option.label)} (${option.id})`}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                sx={{ width: 300 }}
                                onChange={handleClienteChange}
                                renderInput={(params) => <TextField {...params} label="Clientes" />}
                            />
                            <Button variant='contained'>Agregar Cliente</Button>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={Productos}
                                getOptionLabel={(option) => `${truncateText(option.label)} (${option.id})`}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                disableClearable
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Productos" />}
                                onChange={(event, value) => handleAddProducto(value)}
                            />
                            <Typography variant='h6' sx={{color : "#7688D2"}}>Total: ${valorTotalGeneral}</Typography>
                            <Button type='submit' variant='contained'>Generar Pedido</Button>
                        </Stack>
                        <Divider sx={{ margin: "1rem 0" }} />
                        {productosAgregados.length === 0 && (
                            <Stack sx={{textAlign:"center"}} direction={"column"} justifyContent={"center"} alignItems={"center"}>
                                <Typography sx={{color : "#7688D2", fontSize: "1.7rem"}}>No hay productos en esta orden de compra...</Typography>
                            </Stack>
                        )}
                        {productosAgregados.map((producto, index) => (
                            <Stack key={index} direction={"row"} spacing={2} sx={{ background: "#fff", padding: "1rem", margin: "1rem 0", borderRadius: "1rem" }}>
                                <TextField sx={{ textOverflow: 'ellipsis' }} readOnly value={producto.referencia} label="Referencia" />
                                <TextField sx={{ textOverflow: 'ellipsis' }} readOnly value={truncateText(producto.producto)} label="Producto" />
                                <TextField readOnly value={producto.valorUnitario} label="Valor Unitario" />
                                <TextField label="Cantidad" value={producto.cantidad} onChange={(event) => handleCantidadChange(event, index)} />
                                <TextField value={producto.valorTotal} label="Valor Total" />
                                {/* <TextField label="Descuento %" /> */}
                                <Button variant='contained' onClick={() => handleDeleteProducto(index)}>Eliminar</Button>
                            </Stack>
                        ))}
                    </form>
                </Box>
            </Stack>
        </div>
    );
}
