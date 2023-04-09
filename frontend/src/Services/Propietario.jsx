

//Mostrar mis reservas

export async function reservasPendiente (id_propietario){
    const response = await fetch(`http://127.0.0.1:3001/api/propietario/reservasPendientes/${id_propietario}`,
    {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    })

    const data = await response.json();
    return data;

}