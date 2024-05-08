'use client'

import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import React from 'react'
import postobon from '../../../../public/images/postobon.webp'
import leche from '../../../../public/images/leche.png'
import Image from 'next/image';
import './styles.css'

function Productos() {

  const productos = [
    {
      id: 1,
      imagen: leche,
      nombre: 'Lacteo',
      precio: 100,
      cantidad: 10,
      descripcion: 'Descripcion del producto 1',
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
      nombre: 'fruta',
      precio: 100,
      cantidad: 10,
      descripcion: 'Descripcion del producto 4',
      categoria: 'frutas'
    }
  ]

  return (
    <>
      <div className='contenedor-producto' style={{ marginTop: '1%', marginLeft: '1%' }}>
        {productos.map(({ id, imagen, nombre, precio, cantidad, descripcion }) => {
          return (
            <div key={id} className="producto">
              <div className='tarjeta'>
                <div className='imagen'>
                  <Image src={imagen} alt='imagen' className='imagen' />
                </div>
                <div className='descripcion'>
                  <h1>{nombre}</h1>
                  <p>{descripcion}</p>
                  <p>Existencia: {cantidad}</p>
                  <span>${precio}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Productos