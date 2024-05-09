"use client";

import { Backdrop, Box, Divider, Fade, Modal, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import React, { useEffect, useState } from "react";
import postobon from "../../../../public/images/postobon.webp";
import leche from "../../../../public/images/leche.png";
import Image from "next/image";
import "./styles.css";
import Detail from "./detail";
import Swal from 'sweetalert2';

import { Backdrop, Box, Divider, Fade, Modal, TextField} from '@mui/material'
//Buttons
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { handleClientScriptLoad } from "next/script";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [viewDetail, setViewDetail] = useState();
  const [viewEdit, setViewEdit] = useState(false);

  const handleClick = (id) => {
    // Añadido parámetro producto
    // Actualiza viewDetail con el producto seleccionado
    setOpen(true);
    setViewDetail(id);
  };

  const handleEdit = () => {
    setViewEdit(true);
   
  };
  const handleCloseEdit = () => {
    setViewEdit(false);
    
  };

  // const productos = [
  //   {
  //     id: 1,
  //     imagen: leche,
  //     nombre: 'Lacteo',
  //     precio: 100,
  //     cantidad: 10,
  //     descripcion: 'Está libre de antibióticos y conservantes. Es una leche entera, ordeñada bajo procesos altamente higiénicos. Ideal para disfrutar en cualquier momento del día.',
  //     categoria: 'lacteos'
  //   },
  //   {
  //     id: 2,
  //     imagen: postobon,
  //     nombre: 'Carne',
  //     precio: 100,
  //     cantidad: 10,
  //     descripcion: 'Descripcion del producto 2',
  //     categoria: 'carnes'
  //   },
  //   {
  //     id: 3,
  //     imagen: postobon,
  //     nombre: 'Fruta',
  //     precio: 100,
  //     cantidad: 10,
  //     descripcion: 'Descripcion del producto 3',
  //     categoria: 'frutas'
  //   },
  //   {
  //     id: 4,
  //     imagen: postobon,
  //     nombre: 'Gaseosa',
  //     precio: 100,
  //     cantidad: 10,
  //     descripcion: 'Descripcion del producto 4',
  //     categoria: 'frutas'
  //   },
  //   {
  //     id: 5,
  //     imagen: postobon,
  //     nombre: 'fruta',
  //     precio: 100,
  //     cantidad: 10,
  //     descripcion: 'Descripcion del producto 5',
  //     categoria: 'frutas'
  //   },
  //   {
  //     id: 6,
  //     imagen: postobon,
  //     nombre: 'fruta',
  //     precio: 100,
  //     cantidad: 10,
  //     descripcion: 'Descripcion del producto 6',
  //     categoria: 'frutas'
  //   },
  //   {
  //     id: 7,
  //     imagen: postobon,
  //     nombre: 'fruta',
  //     precio: 100,
  //     cantidad: 10,
  //     descripcion: 'Descripcion del producto 7',
  //     categoria: 'frutas'
  //   }
  // ]

  const deleteProduct = (id) => {
    console.log("id", id);
    fetch(`http://localhost:5000/productos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetch("http://localhost:5000/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  // console.log(productos)

  return (
    <>
      <div
        className="contenedor-producto"
        style={{ marginTop: "1%", marginLeft: "1%" }}
      >
        {productos.map(({ id, imagen, nombre, precio, stock }) => {
          return (
            <div key={id} className="producto" >
              <div className="tarjeta" >
                <div className="section1" onClick={() => handleClick(id)}>
                <div className="imagen">
                  {/* <Image src={imagen} alt='imagen' className='imagen'/> */}
                  <img src={imagen} alt="imagen" className="imagen" />
                </div>
                <Divider flexItem />
                <div className="descripcion">
                  <h3 style={{ fontSize: "1.2rem" }}>{nombre}</h3>
                  <p style={{ fontSize: "0.8rem" }}>Stock: {stock}</p>
                  <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                    ${precio}
                  </span>
                </div>
                </div>
                <Divider />
                <div className="botones">
                  <IconButton
                    aria-label="edit"
                    onClick={handleEdit}
                    sx={{
                      color: (theme) => theme.palette.success.light,
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      Swal.fire({
                        title: "¿Estás seguro?",
                        text: "¡No podrás revertir esto!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "¡Sí, bórralo!"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteProduct(id);

                          Swal.fire(
                            '¡Eliminado!',
                            'Tu producto ha sido eliminado.',
                            'success'
                          )
                          
                        }
                      })
                    }}
                    sx={{
                      color: (theme) => theme.palette.error.light,
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  
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
          <div className="modal" key={viewDetail}>
            <h1>Detalle del producto</h1>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.primary,
              }}
            >
              <CloseIcon />
            </IconButton>

            <Divider />
            {productos.find((p) => p.id === viewDetail) ? (
              <>
                <div className="detalles">
                  {/* <Image className='imagenDetail' src={productos.find(p => p.id === viewDetail).imagen} /> */}
                  <img
                    className="imagenDetail"
                    src={productos.find((p) => p.id === viewDetail).imagen}
                  />
                  <div>
                    <h1 style={{ marginBottom: "5%" }}>
                      {productos.find((p) => p.id === viewDetail).nombre}
                    </h1>
                    <p style={{ marginBottom: "7%" }}>
                      ${productos.find((p) => p.id === viewDetail).precio}
                    </p>
                    <p style={{ marginBottom: "5%" }}>
                      Stock: {productos.find((p) => p.id === viewDetail).stock}
                    </p>
                    <Divider />
                    <h2 style={{ marginTop: "5%" }}>Descripción</h2>
                    <p style={{ marginTop: "5%" }}>
                      {" "}
                      {productos.find((p) => p.id === viewDetail).descripcion}
                    </p>
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
          <div className="modal" key={viewDetail}>
            <h1>Editar el producto</h1>
            <IconButton
              aria-label="close"
              onClick={handleCloseEdit}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.primary,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Divider />
            {productos.find((p) => p.id === viewDetail) ? (
              <>
                <div className="detalles">
                  {/* <Image className='imagenDetail' src={productos.find(p => p.id === viewDetail).imagen} /> */}
                  <img
                    src={productos.find((p) => p.id === viewDetail).imagen}
                    alt="imagen"
                    className="imagenDetail"
                  />
                  <div>
                    <TextField
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                    />
                    <h1 style={{ marginBottom: "5%" }}>
                      {productos.find((p) => p.id === viewDetail).nombre}
                    </h1>
                    <p style={{ marginBottom: "7%" }}>
                      ${productos.find((p) => p.id === viewDetail).precio}
                    </p>
                    <p style={{ marginBottom: "5%" }}>
                      Stock: {productos.find((p) => p.id === viewDetail).stock}
                    </p>
                    <Divider />
                    <h2 style={{ marginTop: "5%" }}>Descripción</h2>
                    <p style={{ marginTop: "5%" }}>
                      {" "}
                      {productos.find((p) => p.id === viewDetail).descripcion}
                    </p>
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
  );
}

export default Productos;
