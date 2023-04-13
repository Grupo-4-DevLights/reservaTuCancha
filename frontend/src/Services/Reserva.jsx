export async function obtenerReservas() {
    const response = await fetch('http://localhost:3001/api/reserva', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    return data;
}