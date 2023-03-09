
import { useEffect, useState } from 'react'
import {obtenerEmpresas} from '../../Services/Socio'
import {Link} from 'react-router-dom'

export const VisualizarEmpresas = () => {

    const [empresas, setEmpresas] = useState([])

    const [error, setError]= useState('')
    const [loading, setLoading]= useState(false)


    useEffect(() => {
        setLoading(true)
        obtenerEmpresas()
            .then(data => setEmpresas(data))
            .catch(error => setError(error))
            .finally(()=>setLoading(false))
    }, [])


    if (loading) return <h1>Cargando....</h1>
    if (error) return <h1>Error proveniente del servidor</h1>
    else{
    return (
        <div className='principal'>
            <h1 className=' text-center'> Eliga el nombre de la empresa que quiere alquilar cancha:</h1>
            {empresas.map((empresa,index)=>(
                <div className='select-empresa text-center' key={index}>
                    <Link to={`/socio/elegircancha/${empresa.id_empresa}`}>
                        <button  className='' value={empresa.nombre}>{empresa.nombre}</button>
                    </Link>
                </div>
            ))}
            {error && <p>{error}</p>}
        </div>
    )}



}