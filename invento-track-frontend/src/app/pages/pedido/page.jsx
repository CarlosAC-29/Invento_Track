'use client'
import Navbar from '@/app/components/navbar'
import React, { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import { styled } from '@mui/material/styles';
import './styles.css'
import { Badge, Box, Button, Chip, Divider } from '@mui/material'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import Swal from 'sweetalert2';
import TableRow from '@mui/material/TableRow';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { getPedidoProducto, getCliente, getProducto, getVendedor, deletePedido } from '@/app/api/api.routes';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
//Dialog imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//Transition:
import Slide from '@mui/material/Slide';
import { useAppContext } from '@/app/context';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import { useRouter } from 'next/navigation'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(2),
}));


// const cliente = [
//   {
//     id: 1,
//     nombre: 'Carlos',
//     apellido: 'Perez',
//     email: 'carlos.perez@gmail.com',
//     telefono: '1234567890',
//     direccion: 'Calle 123',
//   }
// ]

// const orden = [
//   {
//     id: 1,
//     fecha: '16 de Mayo de 2025',
//     vendedor: 'Sarah Paulson',
//     estado: 'En proceso',
//   }
// ]

// const productos = [
//   {
//     id: 1,
//     imagen: postobon,
//     nombre: 'Producto 1',
//     referencia: '123456',
//     cantidad: 2,
//     precio: 100,
//   },
//   {
//     id: 2,
//     imagen: postobon,
//     nombre: 'Producto 2',
//     referencia: '123456',
//     cantidad: 3,
//     precio: 100,
//   },
//   {
//     id: 2,
//     imagen: postobon,
//     nombre: 'Producto 2',
//     referencia: '123456',
//     cantidad: 3,
//     precio: 100,
//   },
//   {
//     id: 2,
//     imagen: postobon,
//     nombre: 'Producto 2',
//     referencia: '123456',
//     cantidad: 3,
//     precio: 100,
//   },
//   {
//     id: 2,
//     imagen: postobon,
//     nombre: 'Producto 2',
//     referencia: '123456',
//     cantidad: 3,
//     precio: 100,
//   }
// ]

export default function Pedido({ searchParams }) {

  const { user, setUser } = useAppContext();


  const [detalles, setDetalles] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [vendedor, setVendedor] = useState([]);
  const [productos, setProductos] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const printRef = useRef();


  //Dialog 
  const [open, setOpen] = React.useState(false);
  //Funciones del Dialog cancelar orden.
  const handleCancelarOrden = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAceptarCancelar = () => {
    setOpen(false);
    deletePedidoUtil()
  }

  const deletePedidoUtil = async () => {
    Swal.fire({
      title: 'El pedido se está eliminando, espere un momento...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      button: true,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    const response = await deletePedido(searchParams.id)

    //En caso de que se borre exitosamente, volvemos a la lista
    if (response) {
      Swal.close();
      router.push('/pages/listas/pedidos')
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El pedido no se ha podido eliminar, por favor inténtalo nuevamente',
      });
    }
  }

  /////
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDetallePedido = async () => {
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
    const response = await getPedidoProducto(searchParams.id)
    if (response) {
      setDetalles(response);
      localStorage.setItem("detalles", JSON.stringify(response))

      const responseCliente = await getCliente(response[0].id_cliente)
      if (responseCliente) {
        setCliente(responseCliente);
        localStorage.setItem("cliente", JSON.stringify(responseCliente))
      }

      const responseVendedor = await getVendedor(response[0].id_vendedor)
      if (responseVendedor) {
        setVendedor(responseVendedor);
      }

      // let responseProductos = []
      let responseProductos = []
      for (let i = 0; i < response.length; i++) {
        const producto = await getProducto(response[i].id_producto)
        if (producto) {
          responseProductos.push(producto);
        }
      }
      if (responseProductos) {
        Swal.close();
        setProductos(responseProductos.flat());
        localStorage.setItem("productos", JSON.stringify(responseProductos.flat()))
      }

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrió un error al cargar la información, por favor intenta de nuevo.',
      });
    }
  }

  // const handleCliente = async () => {
  //   const response = await getCliente(detalles[0].id_cliente)
  //   if (response) {
  //     setCliente(response);
  //   }
  // }
  const router = useRouter()
  const handleEdit = () => {
    router.push('/pages/pedido/editar?id=' + searchParams.id)
  }
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });


  useEffect(() => {
    handleDetallePedido();
    // handleCliente();
  }, []);

  return (
    <>
      <head>
        <title>Pedido</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.ico" />
      </head>
      <body>
        <header>
          <Navbar atras="./listas/pedidos" />
        </header>
        <main>
          <Box className='contenedor'>
            <Box className='top-bar'>
              <Grid container>
                <Grid xs={6} spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  <ShoppingBagOutlinedIcon sx={{ marginRight: '1%', color: '#090069' }} />
                  <p style={{ fontSize: '1.3em', color: '#090069' }}>Detalles de la orden</p>
                </Grid>
                <Grid xs={6}>
                  <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Grid>
                      <Button variant="outlined" className='imprimir' sx={{ textTransform: 'none' }} startIcon={<LocalPrintshopOutlinedIcon />} onClick={handlePrint}>Imprimir</Button>
                    </Grid>
                    <Grid>
                      <Button variant="outlined" className='imprimir' sx={{ textTransform: 'none' }} startIcon={<ModeEditOutlineOutlinedIcon />} onClick={handleEdit}>Editar pedido</Button>
                    </Grid>
                    {user.role === 'addmin' ?
                      <Grid>
                        <Button variant="outlined" color='error' sx={{ textTransform: 'none' }} startIcon={<CancelOutlinedIcon />} onClick={handleCancelarOrden}>Cancelar orden</Button>
                      </Grid>
                      :
                      ''
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <div ref={printRef}>
              <Grid className='elementos' container spacing={1} columns={2}>
                <Grid xs={6} md={1}>
                  <Item>
                    <h2>Detalles del cliente</h2>
                    <Divider />
                    {cliente.map(({ id, nombre, apellido, email, telefono, direccion }) => {
                      return (
                        <div key={id} className='detalles'>
                          <div>
                            <p className='subtitulo'>Nombre</p>
                            <p>{nombre} {apellido}</p>
                          </div>
                          <div>
                            <p className='subtitulo'>Email</p>
                            <p>{email}</p>
                          </div>
                          <div>
                            <p className='subtitulo'>Telefono</p>
                            <p>{telefono}</p>
                          </div>
                          <div>
                            <p className='subtitulo'>Direccion</p>
                            <p>{direccion}</p>
                          </div>
                        </div>
                      )
                    })}
                  </Item>
                </Grid>
                <Grid xs={6} md={1}>
                  <Item>
                    <h2>Detalles del pedido</h2>
                    <Divider />
                    {detalles.map(({ id_pedido, fecha_pedido, estado_pedido }) => {
                      return (
                        <div key={id_pedido} className='detalles'>
                          <div>
                            <p className='subtitulo'>Pedido No.</p>
                            <p>{id_pedido}</p>
                          </div>
                          <div>
                            <p className='subtitulo'>Fecha</p>
                            <p>{fecha_pedido}</p>
                          </div>
                          <div>
                            <p className='subtitulo'>Vendedor</p>
                            <p>{vendedor.map(({ nombre }) => nombre)} {vendedor.map(({ apellido }) => apellido)}</p>
                          </div>
                          <div>
                            <p className='subtitulo'>Estado</p>
                            {/* <Chip className='chip' icon={<AccessTimeIcon/>} label={estado_pedido} variant="outlined"/> */}
                            <p><b>{estado_pedido}</b></p>
                          </div>
                        </div>
                      )
                    })[0]}
                  </Item>
                </Grid>
                <Grid xs={12}>
                  <Item>
                    <h2 style={{ padding: '1%' }}>Productos</h2>
                    <Divider />
                    <TableContainer>
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
                          {productos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({ id, imagen, nombre, referencia, precio }) => {
                            const cantidad = detalles.find(({ id_producto }) => id_producto === id).cantidad_producto;
                            return (
                              <TableRow key={id} hover>
                                <TableCell>
                                  <div className='producto'>
                                    <img src={imagen} alt='imagen' style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px', backgroundColor: '#f6f6f6', float: 'left' }} />
                                    <div style={{ display: 'block', width: '100%' }}>
                                      <p>{nombre}</p>
                                      <p style={{ color: 'gray' }}>SKU: {referencia}</p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <p>{cantidad}</p>
                                </TableCell>
                                <TableCell>
                                  <p>${precio.toLocaleString('es-CO', { minimumFractionDigits: 2 })}</p>
                                </TableCell>
                                <TableCell>
                                  <p>${(cantidad * precio).toLocaleString('es-CO', { minimumFractionDigits: 2 })}</p>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={productos.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableContainer>
                    <Divider />
                    <Grid container sx={{ padding: '1.5%' }}>
                      <Grid xs={12}>
                        <div>
                          <p className='total'>Total del pedido</p>
                          <p style={{ fontSize: '1.4em' }}>
                            ${detalles.map(({ total_pedido }) => total_pedido.toLocaleString('es-CO', { minimumFractionDigits: 2 }))[0]}
                          </p>
                        </div>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
              </Grid>
            </div>
          </Box>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle sx={{ color: "#090069", fontWeight: 'bold' }}>{"¿Estás seguro que deseas borrar el pedido?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description" sx={{ color: "black" }}>
                Ten en cuenta que si borras el pedido ya no podrás recuperarlo. Deberás crear nuevamente la orden de pedido y te arriesgarás a perder la información !
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button sx={{ color: '#090069' }} onClick={handleAceptarCancelar}>Aceptar</Button>
              <Button sx={{ color: '#090069' }} onClick={handleClose}>Cancelar</Button>
            </DialogActions>
          </Dialog>
        </main>
      </body>
    </>
  );
}