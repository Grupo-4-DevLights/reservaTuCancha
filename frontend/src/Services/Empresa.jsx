export async function registerEmpresa(empresa) {
    const response = await fetch('http://localhost:3001/api/empresa', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(empresa)
    })
    const data = await response.json();
    return data;
}

export async function obtenerEmpresas() {
    const response = await fetch('http://localhost:3001/api/empresa', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    })
    const data = await response.json();
    return data;
}

export async function obtenerEmpresasConId(empresa_id) {
    const response = await fetch(`http://localhost:3001/api/empresa/${empresa_id}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    return data;
}