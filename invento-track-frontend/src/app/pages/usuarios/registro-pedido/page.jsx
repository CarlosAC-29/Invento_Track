"use client"
import React, { useState } from 'react';
import { Box, Typography, Stack, TextField, Button, Autocomplete, Divider } from '@mui/material';
import styles from './styles.module.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function RegistroPedido() {
    const [productosAgregados, setProductosAgregados] = useState([]);

    const Clientes = [
        { value: 1, label: 'Carlos' },
        { value: 2, label: 'Camilo' },
        { value: 3, label: 'Luis' }
    ];

    const Productos = [
        { value: 1, label: 'Agua', precio: 2000 },
        { value: 2, label: 'Gaseosa', precio: 3000 },
        { value: 3, label: 'Bombon', precio: 500 }
    ];

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
                referencia: productoSeleccionado.label,
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
                <Box sx={{ bgcolor: 'white', borderRadius: '1rem', padding: '2rem 4rem', marginBottom: '1rem' }}>
                    <form>
                        <Stack spacing={2} direction={'row'} s>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={Clientes}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Clientes" />}
                            />
                            <Button variant='contained'>Agregar Cliente</Button>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={Productos}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Productos" />}
                                onChange={(event, value) => handleAddProducto(value)}
                            />
                            <Typography variant='h6'>Total: ${valorTotalGeneral}</Typography>
                            <Button variant='contained'>Generar Pedido</Button>
                        </Stack>
                        <Divider sx={{ margin: "1rem 0" }} />
                        {productosAgregados.map((producto, index) => (
                            <Stack key={index} direction={"row"} spacing={2} sx={{ background: "#fff", padding: "1rem", margin: "1rem 0", borderRadius: "1rem" }}>
                                <TextField value={producto.referencia} label="Referencia" />
                                <TextField value={producto.producto} label="Producto" />
                                <TextField value={producto.valorUnitario} label="Valor Unitario" />
                                <TextField label="Cantidad" value={producto.cantidad} onChange={(event) => handleCantidadChange(event, index)} />
                                <TextField value={producto.valorTotal} label="Valor Total" />
                                <TextField label="Descuento %" />
                                <Button variant='contained' onClick={() => handleDeleteProducto(index)}>Eliminar</Button>
                            </Stack>
                        ))}
                    </form>
                </Box>
            </Stack>
        </div>
    );
}
