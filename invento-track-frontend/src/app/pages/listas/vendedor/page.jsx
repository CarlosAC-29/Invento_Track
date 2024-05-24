'use client'
import React, { use } from 'react'
//import './styles.css'
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, TextField, Paper, Stack, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/navbar';
import { eliminarVendedor, listaVendedores } from '@/app/api/api.routes';
import Link from 'next/link';
import Swal from 'sweetalert2';


const PasswordCell = ({ value }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={5}>
      {passwordVisible ? (
        <p>
          {value}
        </p>
      ) : (
        <p>
          *****
        </p>
      )}
      <IconButton sx={{ color: 'primary' }} onClick={togglePasswordVisibility}>
        {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </Stack>
  );
};

function ListaVendedores() {
  const [vendedor, setVendedor] = useState([]);
  const [buscar, setBuscar] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [vendedoresFiltrados, setVendedorFiltrados] = useState([]);
  const router = useRouter();


  const handleVerTodos = () => {
    setVendedorFiltrados(vendedor);
  }

  useEffect(() => {
    const fetchVendedores = async () => {
      const response = await listaVendedores();
      console.log(response);
      if (response) {
        setVendedor(response);
        setVendedorFiltrados(response);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrió un error al cargar la información, por favor intenta de nuevo.',
        });
      }
    };

    fetchVendedores();
  }, []);

  const handleClick = () => {
    router.push('../usuarios/registro-vendedor');
  };

  const handleInputChange = (event) => {
    setBuscar(event.target.value);
  };

  const handleBuscarVendedor = () => {
    if (buscar) {
      const filtrado = vendedor.filter(vendedor => vendedor.nombre.toLowerCase().includes(buscar.toLowerCase()));
      setVendedorFiltrados(filtrado);
    } else {
      setVendedorFiltrados(vendedor);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro que deseas eliminar el Vendedor?",
      text: "Esta acción es irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, deseo borrarlo."
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await eliminarVendedor(id);
        if (response) {
          const newVendedores = vendedor.filter(vendedor => vendedor.id !== id);
          setVendedor(newVendedores);
          setVendedorFiltrados(newVendedores);
          Swal.fire({
            title: "Vendedor eliminado!",
            text: "El Vendedor ha sido eliminado exitosamente.",
            icon: "success"
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error al eliminar el Vendedor, por favor intenta de nuevo.',
          });
        }
      }
    });
  };

  const handleEdit = (id, nombre, apellido, email, direccion, telefono) => {
    console.log(id, nombre, apellido, email, direccion, telefono);
    const params = { id: id, nombre: nombre, apellido: apellido, email: email, direccion: direccion, telefono: telefono };
    console.log(params);
    router.push('../usuarios/editar-vendedor')
  };

  const columns = [
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'apellido', headerName: 'Apellido', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 200,
      renderCell: (params) => {
        console.log("params", params);
        let color = 'default';
        if (params.value === 'ACTIVO') {
          color = 'success';
        } else if (params.value === 'PENDIENTE') {
          color = 'warning';
        } else if (params.value === 'canceled') {
          color = 'error';
        }
        return <Chip label={params.value ? params.value : "error"} color={color} />;
      }
    },
    { field: 'password', headerName: 'Password', width: 300, renderCell: (params) => <PasswordCell value={params.value} /> },
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
              pathname: '../usuarios/editar-vendedor',
              query: {
                id: params.row.id,
                nombre: params.row.nombre,
                apellido: params.row.apellido,
                email: params.row.email,
                estado: params.row.estado,
                password: params.row.password,
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

  const rows = vendedoresFiltrados.map((vendedor, index) => ({
    id: vendedor.id,
    nombre: vendedor.nombre,
    apellido: vendedor.apellido,
    email: vendedor.email,
    estado: vendedor.estado,
    password: vendedor.password,
  }));

  return (
    <>
      <Navbar atras={''}/>
      <Box sx={{ marginTop: "5%" }}>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5%', marginTop: '2%', color: '#090069' }}>
          <h1>Lista de Vendedores</h1>
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
              <Button sx={{ background: "#090069" }} onClick={handleClick} className="botones" variant="contained">
                <AddCircleIcon />
                <p style={{ marginLeft: "1rem" }}>Agregar Vendedor</p>
              </Button>
              <FormControl sx={{ width: '25ch', marginTop: "1rem" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" >Buscar Vendedor</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={'text'}
                  value={buscar}
                  onChange={handleInputChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Search vendedor"
                        edge="end"
                        onClick={handleBuscarVendedor}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Buscar Vendedor"
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
    </>
  )
}

export default ListaVendedores