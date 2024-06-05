'use client'
import React, { useEffect, useState } from 'react';
import { encode } from 'base-64';
import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Navbar from '@/app/components/navbar';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { listarClientes, eliminarCliente } from '@/app/api/api.routes';
import Link from 'next/link';


function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [buscar, setBuscar] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const router = useRouter();

  const handleVerTodos = () => {
    setClientesFiltrados(clientes);
  }

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await listarClientes();
      if (response) {
        setClientes(response);
        setClientesFiltrados(response);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrió un error al cargar la información, por favor intenta de nuevo.',
        });
      }
    };

    fetchClientes();
  }, []);

  const handleClick = () => {
    router.push('../usuarios/registro-clientes');
  };

  const handleInputChange = (event) => {
    setBuscar(event.target.value);
  };

  const handleBuscarCliente = () => {
    if (buscar) {
      const filtrado = clientes.filter(cliente => cliente.nombre.toLowerCase().includes(buscar.toLowerCase()));
      setClientesFiltrados(filtrado);
    } else {
      setClientesFiltrados(clientes);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro que deseas eliminar el cliente?",
      text: "Esta acción es irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, deseo borrarlo."
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await eliminarCliente(id);
        if (response) {
          const newClientes = clientes.filter(cliente => cliente.id !== id);
          setClientes(newClientes);
          setClientesFiltrados(newClientes);
          Swal.fire({
            title: "¡Cliente eliminado!",
            text: "El cliente ha sido eliminado exitosamente.",
            icon: "success"
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error al eliminar el cliente, por favor intenta de nuevo.',
          });
        }
      }
    });
  };

  const handleEdit = (id, nombre, apellido, email, direccion, telefono) => {
    console.log(id, nombre, apellido, email, direccion, telefono);
    const params = { id: id, nombre: nombre, apellido: apellido, email: email, direccion: direccion, telefono: telefono };
    console.log(params);
    router.push('../usuarios/editar-clientes')
  };

  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'apellido', headerName: 'Apellido', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'direccion', headerName: 'Dirección', width: 200 },
    { field: 'telefono', headerName: 'Teléfono', width: 150 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div>
          <Link
            href={{
              pathname: '../usuarios/editar-clientes',
              query: {
                id: params.row.id,
                nombre: params.row.nombre,
                apellido: params.row.apellido,
                email: params.row.email,
                direccion: params.row.direccion,
                telefono: params.row.telefono,
              }
            }}
          >
            <IconButton aria-label="edit" onClick={() => handleEdit(params.row.id, params.row.nombre, params.row.apellido, params.row.email, params.row.direccion, params.row.telefono)}>
              <BorderColorOutlinedIcon sx={{ color: "#090069" }} />
            </IconButton>
          </Link>
          <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
            <DeleteOutlinedIcon sx={{ color: "#090069" }} />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows = clientesFiltrados.map((cliente, index) => ({
    id: cliente.id,
    nombre: cliente.nombre,
    apellido: cliente.apellido,
    email: cliente.email,
    direccion: cliente.direccion,
    telefono: cliente.telefono,
  }));

  return (
    <>
      <head>
        <title>Lista de Clientes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.ico" />
      </head>
      <body>
        <Navbar atras={'/pages/home'} />
        <Box sx={{ marginTop: "5%" }}>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5%', marginTop: '2%', color: '#090069' }}>
            <h1>Lista de clientes</h1>
          </div>

          <Stack direction={"column"} alignItems={"left"} justifyContent={"left"}>
            <Stack direction={"row"} justifyContent={"end"} alignItems={"center"} spacing={10}
              sx={{
                width: "100%",
                marginTop: "2rem",
                paddingRight: "10%",
              }}>
              <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={5}
                sx={{
                  background: "#fff",
                  padding: "1rem",
                  borderRadius: "1rem",
                }}>
                <Button sx={{ background: "#090069" }} onClick={handleClick} id="botonAgregarCliente" className="botones" variant="contained">
                  <AddCircleIcon />
                  <p style={{ marginLeft: "1rem" }}>Agregar cliente</p>
                </Button>
                <FormControl sx={{ width: '25ch', marginTop: "1rem" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" >Buscar cliente</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={'text'}
                    value={buscar}
                    onChange={handleInputChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Search cliente"
                          edge="end"
                          onClick={handleBuscarCliente}
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Buscar cliente"
                  />
                </FormControl>
                <Button onClick={handleVerTodos} variant="contained" style={{ background: "#090069" }}><RefreshIcon /></Button>

              </Stack>
            </Stack>

            <Box sx={{ height: 400, width: '80%', marginTop: '2rem', marginLeft: 'auto', marginRight: 'auto' }}>
              <DataGrid
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
      </body >
    </>
  );
}

export default ListaClientes;
