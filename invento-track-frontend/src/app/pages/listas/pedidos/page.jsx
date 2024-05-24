'use client'
import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, IconButton, Typography, Chip, Select, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '@/app/components/navbar';
import Swal from 'sweetalert2';
import { getPedido } from '@/app/api/api.routes';
import { useRouter } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from 'next/link';

function ListaPedidos() {
  const [pedido, setPedido] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [buscar, setBuscar] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [pedidoFiltrado, setPedidoFiltrado] = useState([]);
  const [estadoFiltrado, setEstadoFiltrado] = useState('');


  const router = useRouter();

  const handleListaPedidos = async () => {
    Swal.fire({
      title: 'Esperando respuesta del servidor...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      button: true,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    const response = await getPedido();
    if (response) {
      Swal.close();
      setPedido(response);
      console.log(response);
      setPedidoFiltrado(response);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrió un error al cargar la información, por favor intenta de nuevo.',
      });
    }
  }

  useEffect(() => {
    handleListaPedidos();
  }, []);

  const handleClick = () => {
    router.push('../usuarios/registro-pedido');
  };

  const handleInputChange = (event) => {
    setBuscar(event.target.value);
  };

  const handleFiltrar = () => {
    let pedidosFiltrados = pedido;

    if (fechaInicio && fechaFin) {
      const inicio = new Date(fechaInicio).setHours(0, 0, 0, 0);
      const fin = new Date(fechaFin).setHours(23, 59, 59, 999);

      if (inicio > fin) {
        Swal.fire({
          title: "Error",
          text: "La fecha de inicio no puede ser posterior a la fecha final.",
          icon: "error",
          confirmButtonText: "OK"
        });
        return;
      }

      pedidosFiltrados = pedidosFiltrados.filter(pedido => {
        const fechaPedido = new Date(pedido.fecha_pedido).getTime();
        return fechaPedido >= inicio && fechaPedido <= fin;
      });
    }

    console.log(estadoFiltrado);

    if (estadoFiltrado) {
      pedidosFiltrados = pedidosFiltrados.filter(pedido => pedido.estado_pedido === estadoFiltrado);
    }

    setPedidoFiltrado(pedidosFiltrados);
  }

  const handleBuscarID = () => {
    if (buscar) {
      const filtrado = pedido.filter(p => p.id_pedido.toString() === buscar);
      setPedidoFiltrado(filtrado);
    }
  }

  const handleVerTodos = () => {
    setPedidoFiltrado(pedido);
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Está seguro que quiere cancelar el pedido?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar pedido',
      cancelButtonText: 'No, mantener pedido'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí llamas a la función que maneja la cancelación del pedido
        console.log('Pedido cancelado', id);
        // Puedes actualizar el estado o hacer una petición para eliminar el pedido
      }
    });
  }

  const handleViewDetails = (id) => {
    // Implement view details logic here
    console.log('View details', id);
  }

  const columns = [
    { field: 'id_pedido', headerName: 'ID Pedido', width: 150 },
    { field: 'fecha_pedido', headerName: 'Fecha Pedido', width: 200 },
    {
      field: 'estado_pedido',
      headerName: 'Estado',
      width: 200,
      renderCell: (params) => {
        let color = 'default';
        if (params.value === 'completed') {
          color = 'success';
        } else if (params.value === 'PENDIENTE') {
          color = 'warning';
        } else if (params.value === 'canceled') {
          color = 'error';
        }
        return <Chip label={params.value} color={color} />;
      }
    },
    { field: 'total_pedido', headerName: 'Total Pedido', width: 200 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon sx={{ color: "#090069" }} />
          </IconButton>
          <Link
            href={{
              pathname: '../pedido',
              query: { id: params.row.id_pedido }
            }}
          >
            <IconButton aria-label="view-details" >
              <SummarizeIcon sx={{ color: "#090069" }} />
            </IconButton>
          </Link>

        </div>
      ),
    },
  ];

  const rows = pedidoFiltrado.map((pedido, index) => ({
    id: index,
    id_pedido: pedido.id_pedido,
    fecha_pedido: new Date(pedido.fecha_pedido).toLocaleString(),
    estado_pedido: pedido.estado_pedido,
    cantidad_producto: pedido.cantidad_producto,
    total_pedido: pedido.total_pedido
  }));

  return (
    <>
      <Navbar atras={''}/>
      <Box sx={{ marginTop: "5%" }}>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5%', marginTop: '2%', color: '#090069' }}>
          <h1>Lista de pedidos</h1>
        </div>

        <Stack direction={"column"} alignItems={"left"} justifyContent={"left"}>

          <Stack direction={"row"} justifyContent={"space-around"} alignItems={"center"} spacing={10}
            sx={{
              width: "100%",
              marginTop: "2rem"
            }}>
            <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={3}
              sx={{
                background: "#fff",
                padding: "1rem",
                borderRadius: "1rem",
              }}>
              <Button sx={{ background: "#090069" }} onClick={handleClick} id="botonAgregarCliente" className="botones" variant="contained">
                <AddCircleIcon />
                <p style={{ marginLeft: "1rem" }}>Nuevo pedido</p>
              </Button>
              <FormControl sx={{ width: '15ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" >Buscar ID</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={'text'}
                  value={buscar}
                  hiddenLabel
                  onChange={handleInputChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Search pedido ID"
                        edge="end"
                        onClick={handleBuscarID}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Buscar ID"
                />
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction={"row"} justifyContent={"center"} spacing={2} >
                  <DatePicker
                    sx={{ width: "40%" }}
                    label="Fecha Inicio"
                    value={fechaInicio}
                    onChange={(newValue) => setFechaInicio(newValue)}
                  />
                  <DatePicker
                    sx={{ width: "40%" }}
                    label="Fecha Fin"
                    value={fechaFin}
                    onChange={(newValue) => setFechaFin(newValue)}
                  />
                </Stack>
              </LocalizationProvider>
              <FormControl sx={{ width: '150px', marginTop: '1rem' }}>
                <InputLabel id="estado-filter-label">Estado</InputLabel>
                <Select
                  labelId="estado-filter-label"
                  id="estado-filter"
                  label="Estado"
                  value={estadoFiltrado}
                  onChange={(e) => setEstadoFiltrado(e.target.value)}
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="PENDIENTE">Pendiente</MenuItem>
                  <MenuItem value="ELIMINADO">Eliminado</MenuItem>
                </Select>
              </FormControl>
              <Button onClick={handleFiltrar} variant="contained" style={{ background: "#090069" }}> <FilterAltIcon />Filtrar</Button>
              <Button onClick={handleVerTodos} variant="contained" style={{ background: "#090069" }}><RefreshIcon /></Button>
            </Stack>
          </Stack>

          <Box sx={{ height: 400, width: '80%', marginTop: '2rem', marginLeft: 'auto', marginRight: 'auto' }}>
            <DataGrid
              components={{
                Toolbar: GridToolbar,
              }}
              sx={{
                backgroundColor: '#fff',
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: 'lightblue',
                  color: '#000',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: 'bold',
                },
              }}
              disableRowSelectionOnClick
              rows={rows}
              columns={columns}
              pageSize={pageSize}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              rowsPerPageOptions={[5, 10, 15]}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              pagination
              autoHeight
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default ListaPedidos;
