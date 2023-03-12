
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


