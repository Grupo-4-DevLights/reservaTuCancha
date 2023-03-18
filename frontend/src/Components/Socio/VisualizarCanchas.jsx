import { useParams,Link } from "react-router-dom"

import {useState,useEffect} from 'react'

import { obtenerCanchas } from "../../Services/Socio"
import { NavBar } from "../NavBar"



export const VisualizarCanchas=()=>{

    const {id}= useParams()

    const [canchas, setCanchas] = useState([])
    const [error, setError]= useState('')
    const [loading, setLoading]= useState(false)


    useEffect(() => {
        setLoading(true)
        obtenerCanchas()
            .then(data => setCanchas(data))
            .catch(error => setError(error))
            .finally(()=>setLoading(false))
    }, [])

    if (loading) return <h1>Cargando....</h1>
    if (error) return <h1>Error proveniente del servidor</h1>
    return(
        <>
        <NavBar />
        <div className='visual-cancha'>
            <h1 className=" text-center text-2xl">Bienvenido a la Empresa {id}</h1>
            <p className=" text-center">Elija que cancha quiere jugar</p>
                {canchas.map((cancha,index)=>(
                    <div className='select-cancha text-center' key={index}>
                        <Link to={`/socio/elegirhorario/${cancha.id_cancha}`}>
                            <p>tipo:{cancha.tipo}</p>
                            <button  className='' value={cancha.nombre}>{cancha.nombre}</button>

                        </Link>
                    </div>
                ))}
        </div>
        </>

    )

}