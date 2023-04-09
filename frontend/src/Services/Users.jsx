export async function registerUser(user) {
    const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const data = await response.json();
    return data;
}

export async function loginUser(user) {
    const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    // TODO - Perfeccionar a futuro el manejo de error

    const data = await response.json();
    return data;
}

