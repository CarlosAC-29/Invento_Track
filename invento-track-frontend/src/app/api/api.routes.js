

const registarVendedor = async (data) => {
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