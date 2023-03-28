export async function ReservarCancha(Cancha) {
    try{
    const response = await fetch('http://localhost:3001/api/socio/', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(Cancha)

    })
    if (response.ok) {
        const data = await response.json()
        return data
      } else {
        throw new Error('Error al reservar la cancha')

        
      }
    } catch (error) {
      throw new Error('Ya tiene alquilado una cancha a esa hora')
    }
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

export async function obtenerCanchas(id_empresa) {
    const response = await fetch(`http://localhost:3001/api/empresa/canchas/${id_empresa}`, {
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

export async function eliminarReservas(id_usuario,id_cancha,id_reserva){
    const response = await fetch(`http://localhost:3001/api/socio/misreservas/eliminar/${id_usuario}/${id_cancha}/${id_reserva}`, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json();
    return data;

}

export async function notificacionesSocio(id_usuario) {
    const response = await fetch(`http://localhost:3001/api/mensaje/mensajes/${id_usuario}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json();
    return data;
}


