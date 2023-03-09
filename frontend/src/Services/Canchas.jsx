

export async function CanchasDisponibles(id) {
    const response = await fetch(`http://localhost:3001/api/cancha/disponibles/${id}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json();
    return data;
}
