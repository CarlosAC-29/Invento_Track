'use client'
//Components imports
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import QuantityInput from '../../../components/editar/numberinput';

//Icons imports 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
//Utils imports
import { getPedidoProducto, getCliente, getProducto, editPedido } from '@/app/api/api.routes';

//Next utils
import { useSearchParams, useRouter } from 'next/navigation'
//Static imports
import './styles.css'
import Navbar from '@/app/components/navbar';


export default function AccordionUsage() {
    //Params y declaraciones.
    const searchParams = useSearchParams()
    const idPedido = searchParams.get('id')
    const router = useRouter()

    //Traer los datos iniciales y popular.
    const [detallesProductos, setDetallesProductos] = React.useState({})
    const [detalles, setDetalles] = React.useState([]);
    const [cliente, setCliente] = React.useState([]);
    const [productos, setProductos] = React.useState([]);
    // Funcion que trae todos los datos para popular.
    const getData = async () => {
        const storedDetalles = JSON.parse(localStorage.getItem('detalles'));
        const storedCliente = JSON.parse(localStorage.getItem('cliente'));
        const storedProductos = JSON.parse(localStorage.getItem('productos'));
        if (storedDetalles && storedCliente && storedProductos) {
            setDetalles(storedDetalles[0])
            setCliente(storedCliente[0])
            setProductos(storedProductos)
            const diccionarioProductos = {};
            storedDetalles.forEach(producto => {
                diccionarioProductos[producto.id_producto] = producto.cantidad_producto;
            });
            setDetallesProductos(diccionarioProductos)
            return
        }
        const response = await getPedidoProducto(idPedido)
        if (response) {
            //Creación de producto con cantidad
            const diccionarioProductos = {};
            response.forEach(producto => {
                diccionarioProductos[producto.id_producto] = producto.cantidad_producto;
            });
            setDetallesProductos(diccionarioProductos)
            ///
            setDetalles(response[0]);
            const responseCliente = await getCliente(response[0].id_cliente)
            if (responseCliente) {
                setCliente(responseCliente[0]);
            }
            let responseProductos = []
            for (let i = 0; i < response.length; i++) {
                const producto = await getProducto(response[i].id_producto)
                if (producto) {
                    responseProductos.push(producto);
                }
            }

            setProductos(responseProductos.flat())
        }
    }
    React.useEffect(() => {
        getData();
    }, []);

    // Funciones relacionadas con precios y total.
    const calculateTotal = () => {
        let total = 0;
        for (let i = 0; i < productos.length; i++) {
            total += productos[i].precio * detallesProductos[productos[i].id];
        }
        return total;
    }



    const [total, setTotal] = React.useState();

    React.useEffect(() => {
        setTotal(calculateTotal);
    }, [detallesProductos, productos]);


    //Manejadores de eventos.
    const handleGuardar = async () => {
        var productosActualizados = []
        for (let llave in detallesProductos) {
            productosActualizados.push({ "id_producto": llave, "cantidad_producto": detallesProductos[llave] })
        }
        const body = {
            "total_pedido": total,
            "estado_pedido": "PENDIENTE",
            "productos": productosActualizados
        }
        const response = await editPedido(idPedido, body)
        if (response) {
            router.push("/pages/pedido?id=" + idPedido)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El pedido no se ha podido eliminar, por favor inténtalo nuevamente',
            });
        }
    }

    const handleCancel = () => {
        router.push("/pages/pedido?id=" + idPedido)
    }
    const handleQuantityChange = (_event, value, id) => {
        setDetallesProductos(prevDetallesProductos => ({
            ...prevDetallesProductos,
            [id]: value
        })
        );
    };

    return (
        <div>
            <Navbar atras={".?id=" + idPedido} />
            <div class="edit-accordion">
                <div class="accordion-class">
                    <Accordion disableGutters={true}>
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
                                    <span id="name">{detalles.id_pedido}</span>
                                </div>
                                <div>
                                    <label style={{ fontWeight: 'bold' }} for="email">Fecha: </label>
                                    <span id="email"> {detalles.fecha_pedido}</span>
                                </div>
                                <div>
                                    <label style={{ fontWeight: 'bold' }} for="telefono">Vendedor: </label>
                                    <span id="telefono"> {detalles.id_vendedor}</span>
                                </div>
                                <div>
                                    <label style={{ fontWeight: 'bold' }} for="direccion">Estado: </label>
                                    <span id="direccion"> {detalles.estado_pedido}</span>
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
                                        {productos.map(({ id, imagen, nombre, referencia, stock, precio }) => {
                                            return (
                                                <TableRow key={id} hover>
                                                    <TableCell>
                                                        <div className='producto'>
                                                            <img src={imagen} alt='imagen' style={{ backgroundColor: '#f6f6f6', borderRadius: '5px' }} width={80} height={80} />
                                                            <div style={{ display: 'block', width: '100%' }}>
                                                                <p>{nombre}</p>
                                                                <p style={{ color: 'gray' }}>SKU: {referencia}</p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <QuantityInput onChange={(event, value) => handleQuantityChange(event, value, id)} defaultValue={detallesProductos[id]} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <p>${precio.toLocaleString('es-CO', { minimumFractionDigits: 2 })}</p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <p>${(detallesProductos[id] * precio).toLocaleString('es-CO', { minimumFractionDigits: 2 })}</p>
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
                            {total !== undefined && total !== null && (
                                <p style={{ fontSize: '1.4em' }}>
                                    ${total.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
                                </p>
                            )}
                        </div>
                    </Accordion>
                    <div class="edit-buttons">
                        <Button variant="contained" sx={{ textTransform: 'none', background: '#090069' }} onClick={handleGuardar}>Guardar cambios</Button>
                        <Button variant="outlined" sx={{ textTransform: 'none', background: 'white', color: '#090069', borderColor: '#090069' }} startIcon={<CancelOutlinedIcon />} onClick={handleCancel}>Cancelar</Button>
                    </div>
                </div>

            </div >
        </div>

    );
}