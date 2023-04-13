import { Link } from "react-router-dom"

import {useState,useEffect} from 'react'

import { obtenerCanchas } from "../../../../Services/Socio"
import {listarEmpresaPropietario} from "../../../../Services/Propietario"

import { NavBar } from "../../../NavBar"

import { useAppContext } from "../../../../context/userContext"



export const ElegirCanchaPropietario=()=>{

    const { user } = useAppContext()
    const id_usuario= parseInt(user.id_usuario)

    const [empresa,Setempresa]= useState({})
    const [canchas, setCanchas] = useState([])
    const [error, setError]= useState('')
    const [loading, setLoading]= useState(false)


    useEffect(()=>{
        if(user){
            setLoading(true)
            listarEmpresaPropietario(id_usuario)
                .then(data => Setempresa(data))
                .catch(error => setError(error))
                .finally(()=>setLoading(false))
        }
    },[])

    useEffect(()=>{
        if(empresa){
            setLoading(true)
            obtenerCanchas(empresa.id_empresa)
                .then(data => setCanchas(data))
                .catch(error => setError(error))
                .finally(()=>setLoading(false))
        }   
    },[empresa])





   

    if (loading) return <h1>Cargando....</h1>
    if (error) return <h1>Hubo un error</h1>
    
    return(
        <>
        <NavBar />
            <p className=" text-center mt-10 mb-4  "> <strong className="text-3xl">visualize el estado de las reservas de cada cancha </strong></p>
                    <div className='cards m-0 p-0 box-border flex flex-wrap	justify-start ml-14 gap-20 '>
                        {console.log(canchas)}
                    {canchas.length !==0 ? canchas.map((cancha,index)=>(
                        <div className='card p-4 border-4 shadow-lg' key={index}>
                            <img className='border-2 w-60 ' src='../../../public/icons.png' alt="mi cancha"/>
                            <h2 className='mt-8 '><strong>nombre:</strong>{cancha.nombre}</h2>
                            <h2><strong>tipo:</strong>{cancha.tipo}</h2>
                            <h2><strong>precio:</strong>{cancha.precio}</h2>

                            <Link to={`/propietario/buttonPropietario/${cancha.id_cancha}`}>
                                <button  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' value={cancha.nombre}>Visualizar canchas</button>
                            </Link>
                        </div>
                    
                    )) : <h1  className="mt-10">No hay canchas disponibles en este momento</h1>}
                    </div>
        </>

    )

}