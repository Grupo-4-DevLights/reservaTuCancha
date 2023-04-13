
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'


import {obtenerEmpresas} from '../../Services/Socio'
import { NavBar } from '../NavBar'
import { LayoutProfile } from '../Profile/LayoutProfile'

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
    else{
    return (
        <>
            <NavBar />
                <div className='principal'>
                        <h1 className=' text-center text-2xl mt-6 mb-6'> Eliga el nombre de la empresa que quiere alquilar cancha:</h1>
                        <div className='cards m-0 p-0 box-border flex flex-wrap	justify-center ml-14 gap-20 '>
                        {empresas.push!==0 ? empresas.map((empresa,index)=>(
                            <div className='card p-4 border-4 shadow-lg' key={index}>
                                <img className='border-2 w-60 ' src={(empresa.imagen) ? empresa.imagen : '../../../public/empresa.jpg'} alt=""/>
                                <h2 className='mt-8 '><strong>nombre:</strong>{empresa.nombre}</h2>
                                <h2><strong>calle:</strong>{empresa.direccion}</h2>
                                <h2><strong>telefono:</strong>{empresa.telefono}</h2>

                                <Link to={`/socio/elegircancha/${empresa.id_empresa}`}>
                                    <button  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' value={empresa.nombre}>Visualizar canchas</button>
                                </Link>
                            </div>
                        )): <h1  className="mt-10">No hay empresas disponibles en este momento</h1>}
                        </div>
                        {error && <p>{error}</p>}
                </div>
        </>
    )}



}