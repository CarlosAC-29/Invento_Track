'use client'
//Components imports
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import QuantityInput from '../../../components/editar/numberinput';


import Image from 'next/image';
//Icons imports 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

//Next utils
import { useSearchParams, useRouter } from 'next/navigation'
//Static imports
import postobon from '../../../../../public/images/postobon.webp'
import './styles.css'
const cliente =
{
    id: 1,
    nombre: 'Carlos',
    apellido: 'Perez',
    email: 'carlos.perez@gmail.com',
    telefono: '1234567890',
    direccion: 'Calle 123',
}


const orden =
{
    id: 1,
    fecha: '16 de Mayo de 2025',
    vendedor: 'Sarah Paulson',
    estado: 'En proceso',
}

const productos = [
    {
        id: 1,
        imagen: postobon,
        nombre: 'Producto 1',
        referencia: '123456',
        cantidad: 2,
        precio: 100,
    },
    {
        id: 2,
        imagen: postobon,
        nombre: 'Producto 2',
        referencia: '123456',
        cantidad: 3,
        precio: 100,
    },
    {
        id: 3,
        imagen: postobon,
        nombre: 'Producto 2',
        referencia: '123456',
        cantidad: 3,
        precio: 100,
    },
    {
        id: 4,
        imagen: postobon,
        nombre: 'Producto 2',
        referencia: '123456',
        cantidad: 3,
        precio: 100,
    },
    {
        id: 5,
        imagen: postobon,
        nombre: 'Producto 2',
        referencia: '123456',
        cantidad: 3,
        precio: 100,
    }
]




export default function AccordionUsage() {
    const searchParams = useSearchParams()
    const idPedido = searchParams.get('id')
    const router = useRouter()

    const initialQuantities = productos.reduce((acc, producto) => {
        acc[producto.id] = producto.cantidad;
        return acc;
    }, {});

    const calculateTotal = (quantities) => {
        let total = 0;
        productos.forEach(producto => total += quantities[producto.id] * producto.precio);
        return total;
    }

    const [quantities, setQuantities] = React.useState(initialQuantities);
    const [total, setTotal] = React.useState(calculateTotal(initialQuantities));
    React.useEffect(() => {
        setTotal(calculateTotal(quantities));
    }, [quantities]);

    const handleCancel = () => {
        router.push("/pages/pedido")
    }
    const handleQuantityChange = (event, value, id) => {
        setQuantities(quantities => ({
            ...quantities,
            [id]: value
        }));
    }

    return (
        <div class="edit-accordion">
            <ArrowBackIosIcon onClick={handleCancel} sx={{
                marginBottom: '2%', color: '#090069', scale: '1.2', height: 'fit-content',
                '&:hover': {
                    cursor: 'pointer',
                },
            }} />

            <div class="accordion-class"> <Accordion disableGutters={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <h2 style={{ fontSize: '1.3em', color: '#090069' }}>  Detalles del cliente</h2>
                    <AccountCircleOutlinedIcon sx={{ marginLeft: '0.6%', color: '#090069' }} />
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <div>
                            <label style={{ fontWeight: 'bold' }} for="name">Nombre: </label>
                            <span id="name">{cliente.nombre} {cliente.apellido}</span>
                        </div>
                        <div>
                            <label style={{ fontWeight: 'bold' }} for="email">Email: </label>
                            <span id="email"> {cliente.email}</span>
                        </div>
                        <div>
                            <label style={{ fontWeight: 'bold' }} for="telefono">Telefono: </label>
                            <span id="telefono"> {cliente.telefono}</span>
                        </div>
                        <div>
                            <label style={{ fontWeight: 'bold' }} for="direccion">Direccion: </label>
                            <span id="direccion"> {cliente.direccion}</span>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
                <Accordion disableGutters={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <h2 style={{ fontSize: '1.3em', color: '#090069' }}> Detalles del pedido</h2>
                        <ShoppingBagOutlinedIcon sx={{ marginLeft: '0.6%', color: '#090069' }} />

                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            <div>
                                <label style={{ fontWeight: 'bold' }} for="name">Id: </label>
                                <span id="name">{orden.id}</span>
                            </div>
                            <div>
                                <label style={{ fontWeight: 'bold' }} for="email">Fecha: </label>
                                <span id="email"> {orden.fecha}</span>
                            </div>
                            <div>
                                <label style={{ fontWeight: 'bold' }} for="telefono">Vendedor: </label>
                                <span id="telefono"> {orden.vendedor}</span>
                            </div>
                            <div>
                                <label style={{ fontWeight: 'bold' }} for="direccion">Estado: </label>
                                <span id="direccion"> {orden.estado}</span>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion disableGutters={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        <h2 style={{ fontSize: '1.3em', color: '#090069' }}> Editar pedido</h2>
                        <ModeEditOutlineOutlinedIcon style={{ marginLeft: '0.6%', color: '#090069' }} />
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer sx={{ maxHeight: 400, '&::-webkit-scrollbar': { display: 'none' } }}>
                            <Table>
                                <TableHead>
                                    <TableRow hover>
                                        <TableCell>
                                            <p className='elemento-producto'>Producto</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className='elemento-producto'>Cantidad</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className='elemento-producto'>Precio unitario</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className='elemento-producto'>Total</p>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productos.map(({ id, imagen, nombre, referencia, cantidad, precio }) => {
                                        return (
                                            <TableRow key={id} hover>
                                                <TableCell>
                                                    <div className='producto'>
                                                        {/* <img src={imagen} alt='imagen' /> */}
                                                        <Image style={{ backgroundColor: '#f6f6f6', borderRadius: '5px' }} src={imagen} alt='imagen' width={80} height={80} />
                                                        <div style={{ display: 'block', width: '100%' }}>
                                                            <p>{nombre}</p>
                                                            <p style={{ color: 'gray' }}>SKU: {referencia}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <QuantityInput onChange={(event, value) => handleQuantityChange(event, value, id)} defaultValue={initialQuantities[id]} />
                                                </TableCell>
                                                <TableCell>
                                                    <p>${precio.toLocaleString('es-CO', { minimumFractionDigits: 2 })}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p>${(quantities[id] * precio).toLocaleString('es-CO', { minimumFractionDigits: 2 })}</p>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>

                    <div style={{ marginLeft: '2.5%', marginBottom: '1%' }}>
                        <p className='total'>Total del pedido</p>
                        <p style={{ fontSize: '1.4em' }}>${total.toLocaleString('es-CO', { minimumFractionDigits: 2 })} </p>
                    </div>
                </Accordion>
                <div class="edit-buttons">
                    <Button variant="contained" sx={{ textTransform: 'none', background: '#090069' }}>Guardar cambios</Button>
                    <Button variant="outlined" sx={{ textTransform: 'none', background: 'white', color: '#090069', borderColor: '#090069' }} startIcon={<CancelOutlinedIcon />} onClick={handleCancel}>Cancelar</Button>
                </div></div>


        </div >
    );
}