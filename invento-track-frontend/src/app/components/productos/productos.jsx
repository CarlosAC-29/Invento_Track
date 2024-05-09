'use client'

import { Backdrop, Box, Divider, Fade, Modal, TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

import './styles.css'
//Buttons
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

function Productos() {

  const [productos, setProductos] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [viewDetail, setViewDetail] = useState();
  const [viewEdit, setViewEdit] = useState(false)
  //Atributos del producto
  // nombre, precio, stock, descripcion, categoria, referencia, imagen
  const [nombre, setNombre] = useState();
  const [precio, setPrecio] = useState();
  const [stock, setStock] = useState();
  const [descripcion, setDescripcion] = useState();
  const [categoria, setCategoria] = useState();
  const [referencia, setReferencia] = useState();

  //Métodos handler
  const handleClick = (id) => { // Añadido parámetro producto
    // Actualiza viewDetail con el producto seleccionado
    setOpen(true);
    setViewDetail(id)
  }
  const saveItemsAttributes = () => {
    const newProduct = {
      nombre: nombre,
      precio: precio,
      stock: stock,
      descripcion: descripcion,
      categoria: categoria,
      referencia: referencia,
    }
    var url = "http://localhost:5000/productos/" + viewDetail
    console.log("Lo que se va a envair es ", newProduct)
    fetch(url, {
      method: 'PUT', // Método PUT
      headers: {
        'Content-Type': 'application/json', // Encabezado para JSON
      },
      body: JSON.stringify(newProduct), // Convertir el objeto a cadena JSON
    }).then((response) => {
      console.log("Este es la respuesta ", response)
    })
  }
  const handleEditSave = () => {
    saveItemsAttributes()
    handleCloseEdit()
  }
  const handleEdit = () => {
    var producto = productos.find(p => p.id === viewDetail)
    setNombre(producto.nombre)
    setPrecio(producto.precio)
    setStock(producto.stock)
    setDescripcion(producto.descripcion)
    setCategoria(producto.categoria)
    setReferencia(producto.referencia)

    setViewEdit(true)
    setOpen(false)
  }
  const handleCloseEdit = () => {
    setViewEdit(false)
    setOpen(true)
  }


  useEffect(() => {
    fetch('http://localhost:5000/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // console.log(productos)


  return (
    <>
      <div className='contenedor-producto' style={{ marginTop: '1%', marginLeft: '1%' }}>
        {productos.map(({ id, imagen, nombre, precio, stock }) => {
          return (
            <div key={id} className="producto" onClick={() => handleClick(id)}>
              <div className='tarjeta'>
                <div className='imagen'>
                  {/* <Image src={imagen} alt='imagen' className='imagen'/> */}
                  <img src={imagen} alt='imagen' className='imagen' />
                </div>
                <Divider flexItem />
                <div className='descripcion'>
                  <h3 style={{ fontSize: '1.2rem' }}>{nombre}</h3>
                  <p style={{ fontSize: '0.8rem' }}>Stock: {stock}</p>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>${precio}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Corresponde al modal de detalles del producto */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div className='modal' key={viewDetail}>
            <h1>Detalle del producto</h1>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.primary,
              }}
            >
              <CloseIcon />
            </IconButton>

            <IconButton
              aria-label="close"
              onClick={handleEdit}
              sx={{
                position: 'absolute',
                right: 58,
                top: 8,
                color: (theme) => theme.palette.success.light,
              }}
            >
              <EditIcon />
            </IconButton>
            <Divider />
            {productos.find(p => p.id === viewDetail) ? (
              <>
                <div className='detalles'>
                  {/* <Image className='imagenDetail' src={productos.find(p => p.id === viewDetail).imagen} /> */}
                  <img className='imagenDetail' src={productos.find(p => p.id === viewDetail).imagen} />
                  <div>
                    <h1 style={{ marginBottom: '5%' }}>{productos.find(p => p.id === viewDetail).nombre}</h1>
                    <p style={{ marginBottom: '7%' }}>${productos.find(p => p.id === viewDetail).precio}</p>
                    <p style={{ marginBottom: '5%' }} >Stock: {productos.find(p => p.id === viewDetail).stock}</p>
                    <Divider />
                    <h2 style={{ marginTop: '5%' }}>Descripción</h2>
                    <p style={{ marginTop: '5%' }}> {productos.find(p => p.id === viewDetail).descripcion}</p>
                  </div>
                </div>
              </>
            ) : (
              <p>Producto no encontrado</p>
            )}
          </div>
        </Fade>
      </Modal>
      {/* Corresponde al modal de editar detalles del producto */}
      <Modal
        open={viewEdit}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={viewEdit}>
          <div className='modal' key={viewDetail}>
            <h1>Editar el producto</h1>
            <IconButton
              aria-label="close"
              onClick={handleCloseEdit}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.primary,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Divider />
            {/* Las opciones que se pueden editar son: 
            nombre, precio, stock, descripcion, categoria, referencia, imagen */}
            {productos.find(p => p.id === viewDetail) ? (
              <>
                <div className='detalles'>
                  <img src={productos.find(p => p.id === viewDetail).imagen} alt='imagen' className='imagenDetail' />
                  <div>
                    <TextField id="outlined-basic" style={{ marginBottom: "10px" }} label="Nombre" variant="outlined" value={nombre} onChange={(event) => { setNombre(event.target.value) }} />
                    <TextField id="outlined-basic" style={{ marginBottom: "10px" }} label="Precio" variant="outlined" value={precio} onChange={(event) => { setPrecio(event.target.value) }} />
                    <TextField id="outlined-basic" style={{ marginBottom: "10px" }} label="Stock" variant="outlined" value={stock} onChange={(event) => { setStock(event.target.value) }} />
                    <TextField id="outlined-basic" style={{ marginBottom: "10px" }} label="Descripcion" variant="outlined" value={descripcion} onChange={(event) => { setDescripcion(event.target.value) }} />
                    <TextField id="outlined-basic" style={{ marginBottom: "10px" }} label="Categoria" variant="outlined" value={categoria} onChange={(event) => { setCategoria(event.target.value) }} />
                    <TextField id="outlined-basic" style={{ marginBottom: "10px" }} label="Referencia" variant="outlined" value={referencia} onChange={(event) => { setReferencia(event.target.value) }} />
                  </div>
                </div>
                <Button
                  onClick={handleEditSave}
                  type='submit'
                  variant="contained"
                  sx={{
                    left: "10%",
                    backgroundColor: "#090069",
                    "&:hover": {
                      backgroundColor: "#1d35f7",
                    }, color: 'white'
                  }}
                >
                  Guardar
                </Button>
                <Button
                  onClick={handleEditSave}
                  type='submit'
                  variant="contained"
                  sx={{
                    left: "13%",
                    backgroundColor: "#090069",
                    "&:hover": {
                      backgroundColor: "#1d35f7",
                    }, color: 'white'
                  }}
                >
                  Cancelar
                </Button>
              </>
            ) : (
              <p>Producto no encontrado</p>
            )}
          </div>
        </Fade>
      </Modal>


    </>
  )
}

export default Productos