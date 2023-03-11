
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
