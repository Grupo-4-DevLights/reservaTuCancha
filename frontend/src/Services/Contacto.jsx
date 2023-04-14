export async function enviarContacto(informacion) {
    const response = await fetch('http://localhost:3001/api/contacto/', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(informacion)
    })
    const data = await response.json();
    return data;
}