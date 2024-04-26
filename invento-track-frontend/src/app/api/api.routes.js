

export const registarVendedor = async (data) => {
    const response = await fetch('http://localhost:5000/vendedores', {
        method: 'POST',
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

export const editVendedor = async (id,data) => {
    const response = await fetch(`http://localhost:5000/vendedores/${id}`, {
        method: 'PUT',
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

export const editCliente = async (id,data) => {
    const response = await fetch(`http://localhost:5000/clientes/${id}`, {
        method: 'PUT',
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

export const registarClientes = async (data) => {
    const response = await fetch('http://localhost:5000/clientes', {
        method: 'POST',
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

export const listarClientes = async (data) => {
    const response = await fetch('http://localhost:5000/clientes', {
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