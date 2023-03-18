export async function ReservarCancha(Cancha) {
    const response = await fetch('http://localhost:3001/api/socio/', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(Cancha)

    })
    const data = await response.json();
    return data;
}


//visualizar todas las empresas para

export async function obtenerEmpresas() {
    const response = await fetch('http://localhost:3001/api/empresa', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json();
    return data;
}

//visualizar todas las canchas

export async function obtenerCanchas() {
    const response = await fetch('http://localhost:3001/api/cancha', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json();
    return data;
}

export async function ObtenerReservas(id_usuario){
    const response = await fetch(`http://localhost:3001/api/socio/misreservas/${id_usuario}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json();
    return data;
}