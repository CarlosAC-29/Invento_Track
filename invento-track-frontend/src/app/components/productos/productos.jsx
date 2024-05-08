'use client'

import { Backdrop, Box, Divider, Fade, Modal } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import React, { useState } from 'react'
import postobon from '../../../../public/images/postobon.webp'
import leche from '../../../../public/images/leche.png'
import Image from 'next/image';
import './styles.css'
import Detail from './detail';

function Productos() {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [viewDetail, setViewDetail] = useState();
  const handleClick = (id) => { // Añadido parámetro producto
    // Actualiza viewDetail con el producto seleccionado
    setOpen(true);
    setViewDetail(id)
    console.log(viewDetail)
  }

  const productos = [
    {
      id: 1,
      imagen: leche,
      nombre: 'Lacteo',
      precio: 100,
      cantidad: 10,
      descripcion: 'Está libre de antibióticos y conservantes. Es una leche entera, ordeñada bajo procesos altamente higiénicos. Ideal para disfrutar en cualquier momento del día.',
      categoria: 'lacteos'
    },
    {
      id: 2,
      imagen: postobon,
      nombre: 'Carne',
      precio: 100,
      cantidad: 10,
      descripcion: 'Descripcion del producto 2',
      categoria: 'carnes'
    },
    {
      id: 3,
      imagen: postobon,
      nombre: 'Fruta',
      precio: 100,
      cantidad: 10,
      descripcion: 'Descripcion del producto 3',
      categoria: 'frutas'
    },
    {
      id: 4,
      imagen: postobon,
      nombre: 'Gaseosa',
      precio: 100,
      cantidad: 10,
      descripcion: 'Descripcion del producto 4',
      categoria: 'frutas'
    },
    {
      id: 5,
      imagen: postobon,
      nombre: 'fruta',
      precio: 100,
      cantidad: 10,
      descripcion: 'Descripcion del producto 5',
      categoria: 'frutas'
    },
    {
      id: 6,
      imagen: postobon,
      nombre: 'fruta',
      precio: 100,
      cantidad: 10,
      descripcion: 'Descripcion del producto 6',
      categoria: 'frutas'
    },
    {
      id: 7,
      imagen: postobon,
      nombre: 'fruta',
      precio: 100,
      cantidad: 10,
      descripcion: 'Descripcion del producto 7',
      categoria: 'frutas'
    }
  ]

  return (
    <>
      <div className='contenedor-producto' style={{ marginTop: '1%', marginLeft: '1%' }}>
        {productos.map(({ id, imagen, nombre, precio, cantidad }) => {
          return (
            <div key={id} className="producto" onClick={() => handleClick(id)}>
              <div className='tarjeta'>
                <div className='imagen'>
                  <Image src={imagen} alt='imagen' className='imagen' />
                </div>
                <Divider flexItem />
                <div className='descripcion'>
                  <h3 style={{ fontSize: '1.2rem' }}>{nombre}</h3>
                  <p style={{ fontSize: '0.8rem' }}>Stock: {cantidad}</p>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>${precio}</span>
                </div>
              </div>
            </div>
          );
        })}

      </div>

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
            <Divider />
            {productos.find(p => p.id === viewDetail) ? (
              <>
                <div className='detalles'>
                  <Image className='imagenDetail' src={productos.find(p => p.id === viewDetail).imagen} />
                  <div>
                    <h1 style={{ marginBottom: '5%' }}>{productos.find(p => p.id === viewDetail).nombre}</h1>
                    <p style={{ marginBottom: '7%' }}>${productos.find(p => p.id === viewDetail).precio}</p>
                    <p style={{ marginBottom: '5%' }} >Stock: {productos.find(p => p.id === viewDetail).cantidad}</p>
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



    </>
  )
}

export default Productos