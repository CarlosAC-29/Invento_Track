"use client";
import { useAppContext } from "@/app/context";
import * as React from "react";
import Navbar from "@/app/components/navbar";
import HailIcon from '@mui/icons-material/Hail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LiquorIcon from '@mui/icons-material/Liquor';
import SpatialAudioIcon from '@mui/icons-material/SpatialAudio';
import { Box, Typography, useTheme, useMediaQuery, Stack, Button } from '@mui/material'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

import checkAuthentication from '../../hooks/useAuthentication';


export default function page() {
  const { user } = useAppContext();
  const router = useRouter();

  const [rol, setRol] = React.useState(user.rol);

  const handleRegistroVendedor = () => {
    router.push("/pages/usuarios/registro-vendedor");
  }

  const handleListarVendedores = () => {
    router.push("/pages/listas/vendedor");
  }

  const handleRegistroCliente = () => {
    router.push("/pages/usuarios/registro-clientes");
  }

  const handleListarClientes = () => {
    router.push("/pages/listas/cliente");
  }
  const handleRegistroPedido = () => {
    router.push("/pages/usuarios/registro-pedido");
  }

  const handleRegistroPedidoVoz = () => {
    router.push("/pages/speech-to-pedido");
  }

  const handleListarPedidos = () => {
    router.push("/pages/listas/pedidos");
  }

  const handleRegistroProducto = () => {
    router.push("/pages/usuarios/registro-producto");
  }

  const handleListarProductos = () => {
    router.push("/pages/listas/productos");
  }

  // const [ isAuthenticated, setIsAuthenticated ] = useState(false)

  // useEffect(() => {
  //   const authenticate = async () => {
  //     const authenticated = await checkAuthentication();
  //     setIsAuthenticated(await checkAuthentication());
  //   };
  //   console.log('auth en effect', isAuthenticated)
  //   authenticate();
  // }, []);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     // console.log('estoy autenticado en el home', isAuthenticated)
  //     router.push("/pages/login");
  //   }
  // }, [isAuthenticated]);

  // if (!isAuthenticated) {
  //   return null; // No renderizar nada si no se está autenticado
  // }

  console.log("user info", user);
  return (
    
    <div>
      <Navbar atras={''} />
      <Stack sx={{ padding: "5%", width: "100%" }} justifyContent={"center"} alignItems={"center"}>
        <Stack spacing={2} direction={"column"} >
          {rol === "vendedor" ?
            <Stack spacing={2} direction={"column"} >
              <Button variant="contained" onClick={handleRegistroCliente}><PersonAddIcon sx={{ marginRight: "1rem" }} />Registo Cliente</Button>
              <Button variant="contained" onClick={handleListarClientes}>Listar Clientes</Button>
              <Button variant="contained" onClick={handleRegistroPedido}><ReceiptIcon sx={{ marginRight: "1rem" }} />Registo Pedido</Button>
              <Button variant="contained" onClick={handleRegistroPedidoVoz}><SpatialAudioIcon sx={{ marginRight: "1rem" }} />Registo Pedido Voz</Button>
              <Button variant="contained" onClick={handleListarPedidos}>Listar Pedidos</Button>
              <Button variant="contained" onClick={handleListarProductos}>Listar Productos</Button>
            </Stack>
            :
            <Stack spacing={2} direction={"column"} >
              <Button variant="contained" onClick={handleRegistroVendedor}><HailIcon sx={{ marginRight: "1rem" }} />Registo Vendedor</Button>
              <Button variant="contained" onClick={handleListarVendedores}>Listar Vendedores</Button>
              <Button variant="contained" onClick={handleRegistroCliente}><PersonAddIcon sx={{ marginRight: "1rem" }} />Registo Cliente</Button>
              <Button variant="contained" onClick={handleListarClientes}>Listar Clientes</Button>
              <Button variant="contained" onClick={handleRegistroPedido}><ReceiptIcon sx={{ marginRight: "1rem" }} />Registo Pedido</Button>
              <Button variant="contained" onClick={handleRegistroPedidoVoz}><SpatialAudioIcon sx={{ marginRight: "1rem" }} />Registo Pedido Voz</Button>
              <Button variant="contained" onClick={handleListarPedidos}>Listar Pedidos</Button>
              <Button variant="contained" onClick={handleRegistroProducto}><LiquorIcon sx={{ marginRight: "1rem" }} />Registo Producto</Button>
              <Button variant="contained" onClick={handleListarProductos}>Listar Productos</Button>
            </Stack>
          }


        </Stack>
      </Stack>
    </div>
  )
}
