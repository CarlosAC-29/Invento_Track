"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Autocomplete,
  Divider,
} from "@mui/material";
import styles from "./styles.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { set, useForm } from "react-hook-form";
import Image from 'next/image';
import vendorIcon from '../../../../../public/images/pedido.png';
import {
  listarClientes,
  getProductos,
  registrarPedido,
} from "@/app/api/api.routes";
import Swal from "sweetalert2";
import { useAppContext } from "@/app/context";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar";

export default function RegistroPedido() {
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null); // Estado para almacenar el cliente seleccionado
  const [clientes, setClientes] = useState("");
  const [productos, setProductos] = useState([]);
  const [infoObtenida, setInfoObtenida] = useState(false);
  const { user } = useAppContext();
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      id_cliente: "",
      productos: productosAgregados,
      total_pedido: "",
      id_vendedor: user.id,
    },
  });

  const getInfo = async () => {
    Swal.fire({
      title: "Esperando respuesta del servidor...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      button: true,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const [responseClientes, responseProductos] = await Promise.all([
        listarClientes(),
        getProductos(),
      ]);
      setClientes(responseClientes);
      setProductos(responseProductos);
      setInfoObtenida(true);
      Swal.close();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error al cargar la información, por favor intenta de nuevo.",
      });
    }
  };

  const handleClienteChange = (event, value) => {
    event.preventDefault();
    const { id } = value;
    console.log(id);
    setClienteSeleccionado(id);
    console.log("clienteSeleccionado", clienteSeleccionado); // Almacenar el cliente seleccionado en el estado
  };

  useEffect(() => {
    if (!infoObtenida) {
      getInfo();
    }
    console.log(clientes);
    setValue(
      "productos",
      productosAgregados.map((producto) => ({
        id_producto: producto.referencia,
        cantidad_producto: producto.cantidad,
      }))
    );
    setValue(
      "total_pedido",
      productosAgregados.reduce(
        (total, producto) => total + producto.valorTotal,
        0
      )
    );
    if (clienteSeleccionado) {
      setValue("id_cliente", clienteSeleccionado); // Asignar el id del cliente seleccionado al campo id_cliente
    }
  }, [productosAgregados, clienteSeleccionado, setValue, infoObtenida]);

  const processForm = async (data) => {
    if (!clienteSeleccionado || productosAgregados.length === 0) {
      // Si no hay cliente seleccionado o no hay productos agregados, mostrar alerta
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "Debes seleccionar un cliente y agregar al menos un producto para realizar el pedido.",
      });
      return;
    }
    Swal.fire({
      title: "Esperando respuesta del servidor...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      button: true,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const enviarPedido = await registrarPedido(data, user.id);

    if (enviarPedido) {
      console.log(enviarPedido);
      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Pedido registrado",
        text: "El pedido se ha registrado correctamente",
      });
    } else {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error al registrar el pedido, por favor intenta de nuevo.",
      });
    }
  };

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
  };

  const handleDeleteProducto = (index) => {
    setProductosAgregados(
      productosAgregados.filter((producto, i) => i !== index)
    );
  };

  const truncateText = (text) => {
    console.log(text);
    // if (text.length > 10) {
    //     return text.substring(0, 10) + '...';
    // } else {
    //     return text;
    // }
  };

  const handleAddProducto = (productoSeleccionado) => {
    console.log(productoSeleccionado);
    const productoExistenteIndex = productosAgregados.findIndex(
      (producto) => producto.referencia === productoSeleccionado.nombre
    );
    if (productoExistenteIndex !== -1) {
      // Si el producto ya existe, aumentar la cantidad en 1
      const nuevosProductos = [...productosAgregados];
      nuevosProductos[productoExistenteIndex].cantidad += 1;
      nuevosProductos[productoExistenteIndex].valorTotal =
        nuevosProductos[productoExistenteIndex].cantidad *
        nuevosProductos[productoExistenteIndex].valorUnitario;
      setProductosAgregados(nuevosProductos);
    } else {
      // Si el producto no existe, agregarlo con cantidad 1
      const nuevoProducto = {
        referencia: productoSeleccionado.id,
        producto: productoSeleccionado.nombre,
        valorUnitario: productoSeleccionado.precio,
        cantidad: 1,
        valorTotal: productoSeleccionado.precio,
      };
      setProductosAgregados([...productosAgregados, nuevoProducto]);
    }
  };

  const handleClick = () => {
    router.push("/pages/listas/pedidos");
  };

  // Calcular el valor total general
  const valorTotalGeneral = productosAgregados.reduce(
    (total, producto) => total + producto.valorTotal,
    0
  );

  return (
    <div>
      <Navbar atras={"../listas/pedidos"} />
      <div className={styles.main_container} >
        <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          sx={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '10px', margin : '20px' , marginTop: '50px', padding: '20px'}}
        >
          <Box
            sx={{
              width: "100%",
              bgcolor: "white",
              padding: "2rem 4rem",
              marginBottom: "1rem",
              marginTop: '50px', padding: '20px'
            }}
          >
            <form onSubmit={handleSubmit(processForm)}>
            <Box sx={{ display: 'flex' }}>
                                <Image src={vendorIcon} width={48} alt='worker' />
                                <Typography sx={{
                                    color: '#090069',
                                    fontSize: '1.8rem',
                                    marginLeft: '1rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1rem'
                                }}>
                                    Registro de Pedido
                                </Typography>
                            </Box>
              <Stack
                spacing={2}
                direction={"row"}
                justifyContent="space-between"
                sx={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '10px'}}
              >
              
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={clientes}
                  disableClearable
                  getOptionLabel={(option) => `${option.nombre} (${option.id})`}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  sx={{ width: 300, margin: "1rem 0"}}
                  onChange={handleClienteChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Clientes" />
                  )}
                />
                <Button variant="contained"  sx={{background: "#090069", margin: '1rem'}} >Agregar Cliente</Button>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={productos}
                  getOptionLabel={(option) => `${option.nombre} (${option.id})`}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  disableClearable
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Productos" />
                  )}
                  onChange={(event, value) => handleAddProducto(value)}
                />
                <Typography variant="h6" sx={{ color: "#7688D2" }}>
                  Total: ${valorTotalGeneral}
                </Typography>
                <Button type="submit" variant="contained" sx={{background: "#090069"}}>
                  Generar Pedido
                </Button>
              </Stack>
              <Divider sx={{ margin: "1rem 0" }} />
              {productosAgregados.length === 0 && (
                <Stack
                  sx={{ textAlign: "center" }}
                  direction={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography sx={{  color: '#090069', fontSize: "1.7rem" }}>
                    No hay productos en esta orden de compra...
                  </Typography>
                </Stack>
              )}
              {productosAgregados.map((producto, index) => (
                <Stack
                  key={index}
                  direction={"row"}
                  spacing={2}
                  sx={{
                    background: "#fff",
                    padding: "1rem",
                    margin: "1rem 0",
                    borderRadius: "1rem",
                  }}
                >
                  <TextField
                    sx={{ textOverflow: "ellipsis" }}
                    readOnly
                    value={producto.referencia}
                    label="Referencia"
                  />
                  <TextField
                    sx={{ textOverflow: "ellipsis" }}
                    readOnly
                    value={producto.producto}
                    label="Producto"
                  />
                  <TextField
                    readOnly
                    value={producto.valorUnitario}
                    label="Valor Unitario"
                  />
                  <TextField
                    label="Cantidad"
                    value={producto.cantidad}
                    onChange={(event) => handleCantidadChange(event, index)}
                  />
                  <TextField value={producto.valorTotal} label="Valor Total" />
                  {/* <TextField label="Descuento %" /> */}
                  <Button
                    variant="contained"
                    onClick={() => handleDeleteProducto(index)}
                  >
                    Eliminar
                  </Button>
                </Stack>
              ))}
            </form>
          </Box>
        </Stack>
      </div>
    </div>
  );
}
