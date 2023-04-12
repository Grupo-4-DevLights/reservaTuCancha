

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

export async function listarEmpresaPropietario(id_usuario){
    const response = await fetch(`http://localhost:3001/api/propietario/visualizarEmpresa/${id_usuario}`
    ,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    })

    //me tiene que devolver un valor entero
    const data = await response.json();
    return data;
    
}