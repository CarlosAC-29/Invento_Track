export const registrarProducto = async (data) => {
    const response = await fetch('http://localhost:5000/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        return false
    }
    return response.json()
}

export const registarVendedor = async (data) => {
    const response = await fetch('http://localhost:5000/vendedores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        return false
    }
    return response.json()
}

export const editVendedor = async (id, data) => {
    const response = await fetch(`http://localhost:5000/vendedores/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        return false
    }
    return response.json()
}

export const editCliente = async (id, data) => {
    const response = await fetch(`http://localhost:5000/clientes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        return false
    }
    return response.json()
}


export const registarClientes = async (data) => {
    const response = await fetch('http://localhost:5000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        return false
    }
    return response.json()
}

export const getProductos = async (data) => {
    const response = await fetch('http://localhost:5000/productos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        return false
    }
    return response.json()
}


export const getProducto = async (id, data) => {
    const response = await fetch(`http://localhost:5000/productos?id_producto=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    
    if(!response.ok){
        return false
    }
    return response.json()
}

export const registrarPedido = async (data, id) => {
    data.id_vendedor = id;
    const response = await fetch('http://localhost:5000/pedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        return false
    }
    return response.json()
}

export const getPedidoProducto = async (id, data) => {
    const response = await fetch(`http://localhost:5000/pedido-producto?id_pedido=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    
    if(!response.ok){
        return false
    }
    return response.json()
}

export const getPedido = async (data) => {
    const response = await fetch('http://localhost:5000/pedido', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        return false
    }
    return response.json()
}

export const registrarPedidoSpeech = async (data, id) => {
    data.id_vendedor = id;
    const response = await fetch('http://localhost:5000/api/gemini', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        return false
    }
    return response.json()
}

export const getVendedor = async (id, data) => {
    const response = await fetch(`http://localhost:5000/vendedores?id_vendedor=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        return false
    }
    return response.json()
}

export const getCliente = async (id, data) => {
    const response = await fetch(`http://localhost:5000/clientes?id_cliente=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        return false
    }
    return response.json()
}


export const listarClientes = async (data) => {
    const response = await fetch('http://localhost:5000/clientes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        return false
    }
    return response.json()
}

export const listarProductos = async (data) => {
    const response = await fetch('http://localhost:5000/productos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        return false
    }
}

// invento-track-frontend/src/app/api/api.routes.js
export const eliminarVendedor = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/vendedores/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

export const eliminarCliente = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/clientes/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

export const listaVendedores = async () => {
    try {
        const response = await fetch(`http://localhost:5000/vendedores`, {
            method: 'GET',
        });
        return response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};