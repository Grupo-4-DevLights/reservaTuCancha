
export async function obtenerSocios() {
    const response = await fetch('http://localhost:3001/api/usuario', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    return data;
}

export async function obtenerSociosConId(id) {
    const response = await fetch(`http://localhost:3001/api/usuario/${id}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    return data;
}

export async function modifyUser(user) {
    const response = await fetch(`http://localhost:3001/api/usuario/${user.id_usuario}`, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const data = await response.json();
    return data;
}

export async function deleteUser(user) {
    const response = await fetch(`http://localhost:3001/api/usuario/${user.id_usuario}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const data = await response.json();
    return data;
}

export async function createUser(user) {
    const response = await fetch(`http://localhost:3001/api/auth/register`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const data = await response.json();
    return data;
}


// EMPRESAS

export async function obtenerEmpresas() {
    const response = await fetch('http://localhost:3001/api/empresa', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    return data;
}

export async function modifyEmpresa(empresa) {
    const response = await fetch(`http://localhost:3001/api/empresa/${empresa.id_empresa}`, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(empresa)
    })
    const data = await response.json();
    return data;
}

export async function deleteEmpresa(empresa) {
    const response = await fetch(`http://localhost:3001/api/empresa/${empresa.id_empresa}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(empresa)
    })
    const data = await response.json();
    return data;
}


// ARREGLAR ESTO

// export async function createEmpresa(empresa) {
//     const response = await fetch(`http://localhost:3001/api/auth/register`, {
//         method: 'POST',
//         headers:{
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(user)
//     })
//     const data = await response.json();
//     return data;
// }