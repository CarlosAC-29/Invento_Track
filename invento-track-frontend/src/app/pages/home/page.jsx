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


export default function page() {
  const {user} = useAppContext();
  const router = useRouter();



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

  console.log("user info", user);
  return (
    
    <div>
      <Navbar atras={''}/>
      <Stack sx={{padding: "5%", width: "100%", height: '100vh'}} justifyContent={"center"} alignItems={"center"}>
        <Stack spacing={2} direction={"column"} sx={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <Button variant="contained" onClick={handleListarVendedores} startIcon={<ReceiptIcon />} sx={{backgroundColor: '#7876ff', color: '#fff', '&:hover': {backgroundColor: '#090069'}, width: '30%', height: '10%', fontSize: '1.5rem', aspectRatio: 1}}>Listar Vendedores</Button>
          <Button variant="contained" onClick={handleListarClientes} startIcon={<ReceiptIcon />} sx={{backgroundColor: '#7876ff', color: '#fff', '&:hover': {backgroundColor: '#090069'}, width: '30%', height: '10%', fontSize: '1.5rem', aspectRatio: 1}}>Listar Clientes</Button>
          <Button variant="contained" onClick={handleRegistroPedidoVoz} sx={{backgroundColor: '#7876ff', color: '#fff', '&:hover': {backgroundColor: '#090069'}, width: '30%', height: '10%', fontSize: '1.5rem', aspectRatio: 1}}><SpatialAudioIcon sx={{marginRight : "1rem"}}/>Registo Pedido Voz</Button>
          <Button variant="contained" onClick={handleListarPedidos} startIcon={<ReceiptIcon />}sx={{backgroundColor: '#7876ff', color: '#fff', '&:hover': {backgroundColor: '#090069'}, width: '30%', height: '10%', fontSize: '1.5rem', aspectRatio: 1}}>Listar Pedidos</Button>
          <Button variant="contained" onClick={handleListarProductos} startIcon={<ReceiptIcon />} sx={{backgroundColor: '#7876ff', color: '#fff', '&:hover': {backgroundColor: '#090069'}, width: '30%', height: '10%', fontSize: '1.5rem', aspectRatio: 1}}>Listar Productos</Button>
        </Stack>
      </Stack>
    </div>
  )
}
