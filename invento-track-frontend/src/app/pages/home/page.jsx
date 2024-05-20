"use client";
import { useAppContext } from "@/app/context";
import * as React from "react";
import Navbar from "@/app/components/navbar";
import HailIcon from '@mui/icons-material/Hail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LiquorIcon from '@mui/icons-material/Liquor';
import { Box, Typography, useTheme, useMediaQuery, Stack, Button } from '@mui/material'
import { useRouter } from 'next/navigation';


export default function page() {
  const {user} = useAppContext();
  const router = useRouter();

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

  const handleListarPedidos = () => {
    router.push("/pages/listas/pedidos");
  }

  const handleRegistroProducto = () => {
    router.push("/pages/usuarios/registro-producto");
  }

  const handleListarProductos = () => {
    router.push("/pages/listas/productos");
  }

  console.log("user info", user);
  return (
    <div>
      <Navbar />
      <Stack sx={{padding: "5%", width: "100%"}} justifyContent={"center"} alignItems={"center"}>
        <Stack spacing={2} direction={"column"} >
          <Button variant="contained" onClick={handleRegistroVendedor}><HailIcon sx={{marginRight : "1rem"}}/>Registo Vendedor</Button>
          <Button variant="contained" onClick={handleListarVendedores}>Listar Vendedores</Button>
          <Button variant="contained" onClick={handleRegistroCliente}><PersonAddIcon sx={{marginRight : "1rem"}}/>Registo Cliente</Button>
          <Button variant="contained" onClick={handleListarClientes}>Listar Clientes</Button>
          <Button variant="contained" onClick={handleRegistroPedido}><ReceiptIcon sx={{marginRight : "1rem"}}/>Registo Pedido</Button>
          <Button variant="contained" onClick={handleListarPedidos}>Listar Pedidos</Button>
          <Button variant="contained"><LiquorIcon sx={{marginRight : "1rem"}}/>Registo Producto</Button>
          <Button variant="contained" onClick={handleListarProductos}>Listar Productos</Button>
        </Stack>
      </Stack>
    </div>
  )
}
