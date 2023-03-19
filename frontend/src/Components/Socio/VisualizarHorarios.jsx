import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { CanchasDisponibles } from '../../Services/Canchas'
import { ReservarCancha } from '../../Services/Socio'
import { NavBar } from '../NavBar'

import { useAppContext } from '../../context/userContext'



export const VisualizarHorarios = () => {
    const { user } = useAppContext();

    //se obtiene el id de la url seleccionada de la empresa
    const { id } = useParams();

    //se cargan el arreglo de objetos sobre las canchas disponibles
    const [horarios, setHorarios] = useState([])
    const [hora, setHora] = useState('')


    //referida a la carga dle fetch
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    // Crea una nueva instancia de la fecha actual
    const fecha = new Date();

    // Obtiene la hora actual en UTC (hora local - desfase horario)
    const horaUTC = fecha.getUTCHours();

    // Transforma la fecha a UTC-3
    fecha.setUTCHours(horaUTC - 3);

    const fechaHoy = (fecha.toISOString().slice(0, 10)) // Imprime la fecha en formato ISO 8601


    const cargarCanchas = async () => {
        setLoading(true)
        await CanchasDisponibles(id)
            .then(data => setHorarios(data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }

    //visualizar canchas
    useEffect(() => {
        cargarCanchas()
    }, [])

    //resevar la cancha
    const handleReservar = async (event) => {
        if (user) {
            const reserva = {
                id_cancha: parseInt(id),
                id_usuario: user.id_usuario,
                fecha: fechaHoy,
                horario: hora
            }
            console.log(reserva)
            await ReservarCancha(reserva)
                .then(data => console.log(data))
                .catch(error => setError(error))
        }
    }

    if (!user) return <p>El usuario no esta logueado</p>
    if (loading) return <h1>Cargando....</h1>
    return (
        <>
            <NavBar />
            <div className='principal'>
                <h1 className=' text-center'>usuario {user.nombre}, elija un horario para alquilar</h1>
                <h1 className=' text-center'>Fecha de {fechaHoy}</h1>
                {console.log(horarios)}
                <form onSubmit={handleReservar}>
                    <div className=' text-center'>
                        <label>elija la horario de inicio:</label>
                        <select name='horario' onChange={(event) => { setHora(event.target.value) }}>
                            <option value="">Seleccione un horario disponible</option>
                            {horarios.length!==0 && horarios.map((hor,index) => (
                                <option key={index} value={hor.horario}>{hor.horario}</option>
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