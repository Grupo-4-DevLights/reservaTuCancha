

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

//canchas disponibles por fecha
export async function CanchasDisponiblesFecha(id, fecha) {
    const response = await fetch(`http://localhost:3001/api/socio/misreservas/${id}/${fecha}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json();
    return data;
}


export async function listarCanchas(){
    const response = await fetch(`http://localhost:3001/api/cancha/`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json();
    return data;
}

export async function registerCancha(values) {
    const response = await fetch(`http://localhost:3001/api/cancha/`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
    const data = await response.json();
    return data;
}

export async function modifyCancha(values) {
    const response = await fetch(`http://localhost:3001/api/cancha/${values.id_cancha}`, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
    const data = await response.json();
    return data;
}

export async function deleteCancha(values) {
    const response = await fetch(`http://localhost:3001/api/cancha/${values.id_cancha}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
    const data = await response.json();
    return data;
}
