import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { CanchasDisponibles } from '../../Services/Canchas'
import {ReservarCancha} from '../../Services/Socio'
import { NavBar } from '../NavBar'  

import {useAppContext} from '../../context/userContext'



export const VisualizarHorarios = () => {
    const {user} = useAppContext();

    //se obtiene el id de la url seleccionada de la empresa
    const {id} = useParams();


    //se cargan el arreglo de objetos sobre las canchas disponibles
    const [horarios, setHorarios] = useState([])

    //se guarda un objeto con los datos de la reserva
    const [horaInicio, setHoraInicio] = useState('')
    const [horaFin, setHoraFin] = useState('')

    
    //referida a la carga dle fetch
    const [error, setError]= useState('')
    const [loading, setLoading]= useState(false)


   // Agregar un día
   //const today = new Date();
   //const tomorrow = new Date(today);
   //tomorrow.setDate(today.getDate() - 1);
  
    // Crea una nueva instancia de la fecha actual
    const fecha = new Date();

    // Obtiene la hora actual en UTC (hora local - desfase horario)
    const horaUTC = fecha.getUTCHours();

    // Transforma la fecha a UTC-3
    fecha.setUTCHours(horaUTC - 3);

    const fechaHoy = (fecha.toISOString().slice(0, 10)) // Imprime la fecha en formato ISO 8601


    //para controlar la fecha
    let inicio
    let fin
    
    //visualizar canchas
    useEffect(() => {
        const cargarCanchas= async ()=>{
            setLoading(true)
            await CanchasDisponibles(id)
                .then(data => setHorarios(data))
                .catch(error => setError(error))
                .finally(()=>setLoading(false))
        }
        cargarCanchas()

    }, [])

    //resevar la cancha
    const  handleReservar = async (event) => {
        const reserva = {
            id_cancha: parseInt(id),
            id_usuario:1,
            fecha: "2023-03-09",
            hora_inicio: horaInicio,
            hora_fin: horaFin
        }
        console.log(reserva)
        await ReservarCancha(reserva)
            .then(data => console.log(data))
            .catch(error => setError(error))

    }


  
    /*
    useEffect(() => {
        if (horaFin && horaInicio){
            inicio= parseInt(horaInicio.slice(0,2))
            fin= parseInt(horaFin.slice(0,2))
            if (fin>inicio){
                setError('El horario de fin no puede ser mayor al horario de inicio para reservar')
            }
        }
        
    }, [error]);
    */
    
    if (!user) return <p>El usuario no esta logueado</p>
    if (loading) return <h1>Cargando....</h1>
    return (
        <>
            <NavBar/>
            <div className='principal'>
                <h1 className=' text-center'>usuario {user.nombre}, elija un horario para alquilar</h1>
                <h1 className=' text-center'>Fecha de {fechaHoy}</h1>

                <form onSubmit={handleReservar}>
                    <div className=' text-center'> 
                        <label>elija la horario de inicio:</label>
                        <select name='hora_inicio' onChange={(event)=>{setHoraInicio(event.target.value)}}>
                            <option value="">Seleccione un horario</option>
                            {horarios.map((horario,index) => (
                                <option key={index} value={horario.hora_inicio}>{horario.hora_inicio}</option>
                            ))}
                        </select>
                    </div>
                    <div className=' text-center'>
                        <label>elija la horario de fin:</label>
                        <select name='hora_fin:' onChange={(event)=>{setHoraFin(event.target.value)}}>
                            <option value="">Seleccione un horario</option>
                            {horarios.map((horario,index) => (
                                <option key={index} value={horario.hora_fin}>{horario.hora_fin}</option>
                            ))}
                        </select>
                    </div>
                    <div className=' text-center'>
                        <button type='submit'>Reservar</button>
                    </div>
                </form>
                {error && <p>{error}</p>}
            </div>
        </>
    )



}