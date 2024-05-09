import { Modal } from '@mui/material'
import React from 'react'
import './styles.css'


function Detail({producto}) {
  const [open, setOpen] = React.useState(false); 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <Modal
        open={open}
        onClose={() => setViewDetail({})}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <div>
        <h1>Detalle del producto</h1>
            <p>Nombre: {producto.nombre}</p>
            <p>Precio: {producto.precio}</p>
            <p>Cantidad: {producto.cantidad}</p>
            <p>Descripcion: {producto.descripcion}</p>
            <p>Categoria: {producto.categoria}</p>
        </div>
    </Modal>
    </>
  )
}

export default Detail