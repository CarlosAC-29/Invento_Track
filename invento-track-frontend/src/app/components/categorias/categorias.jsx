import React, { useState } from 'react'
import './styles.css'
import { Divider } from '@mui/material'

function Categorias() {
  const [selectedCategory, setSelectedCategory] = useState('Todo');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <div style={{ marginTop: '1%', marginRight: '5%', marginLeft: '1%' }}>
        <p className='textoInicial' >Explora las categorías</p>
        <div className='categorias'>
          <p
            onClick={() => handleCategoryClick('Todo')}
            style={{
              color: selectedCategory === 'Todo' ? '#7BAFFB' : '',
              transition: '0.4s',
              cursor: 'pointer',
              fontWeight: selectedCategory === 'Todo' ? 'bold' : ''
            }}
          >
            Todo
          </p>

          <Divider />
          <p
            onClick={() => handleCategoryClick('Lacteos')}
            style={{
              color: selectedCategory === 'Lacteos' ? '#7BAFFB' : '',
              transition: '0.4s',
              cursor: 'pointer',
              fontWeight: selectedCategory === 'Lacteos' ? 'bold' : ''
            }}
          >
            Lácteos
          </p>

          <p
            id='carnes'
            onClick={() => handleCategoryClick('Carnes')}
            style={{
              color: selectedCategory === 'Carnes' ? '#7BAFFB' : '',
              transition: '0.4s',
              cursor: 'pointer',
              fontWeight: selectedCategory === 'Carnes' ? 'bold' : ''
            }}
          >
            Carnes
          </p>
          <p
            id='frutas'
            onClick={() => handleCategoryClick('Frutas')}
            style={{
              color: selectedCategory === 'Frutas' ? '#7BAFFB' : '',
              cursor: 'pointer',
              transition: '0.4s',
              fontWeight: selectedCategory === 'Frutas' ? 'bold' : ''
            }}
          >
            Frutas
          </p>
          <p
            id='verduras'
            onClick={() => handleCategoryClick('Verduras')}
            style={{
              color: selectedCategory === 'Verduras' ? '#7BAFFB' : '',
              cursor: 'pointer',
              transition: '0.4s',
              fontWeight: selectedCategory === 'Verduras' ? 'bold' : ''
            }}
          >
            Verduras
          </p>
        </div>

      </div>


    </>
  )
}

export default Categorias