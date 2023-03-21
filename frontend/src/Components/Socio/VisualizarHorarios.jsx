import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { CanchasDisponibles } from '../../Services/Canchas'
import { ReservarCancha } from '../../Services/Socio'
import { NavBar } from '../NavBar'

import { useAppContext } from '../../context/userContext'

import Swal from 'sweetalert2'


export const VisualizarHorarios = () => {
    const { user } = useAppContext();

    //se obtiene el id de la url seleccionada de la empresa
    const { id } = useParams();

    //se cargan el arreglo de objetos sobre las canchas disponibles
    const [horarios, setHorarios] = useState([])
    const [hora, setHora] = useState('')
    const [cantidadConfirmada,setCantidadConfirmada]=useState(0)

    //referida a la carga dle fetch
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
    const handleReservar = async (e) => {
        e.preventDefault();
        if (user) {
          const reserva = {
            id_cancha: parseInt(id),
            id_usuario: user.id_usuario,
            fecha: fechaHoy,
            horario: hora
          }
          if( !reserva.horario){
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Debe seleccionar un horario',
              confirmButtonColor: '#EF4444'
            });
            return
          }
          console.log(reserva);
          await ReservarCancha(reserva)
            .then(data => {
              console.log(data);
              Swal.fire({
                icon: 'success',
                title: '¡Reservado!',
                text: 'La cancha ha sido reservada exitosamente.',
                confirmButtonColor: '#60A5FA',
                
              });
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: error,
                confirmButtonColor: '#EF4444'
              });
            });
            cargarCanchas()
        }
      }






    if (!user) return <p>El usuario no esta logueado</p>
    if (loading) return <h1>Cargando....</h1>
    return (
        <>
            <NavBar />
            <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-center mb-4">
                    Usuario {user.nombre}, elija un horario para alquilar
                </h1>
                <h2 className="text-xl font-semibold text-center mb-8">
                    Fecha de {fechaHoy}
                </h2>
                <form className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label htmlFor="horario" className="block text-gray-700 font-bold mb-2">
                            Elija un horario de inicio:
                        </label>
                        <select
                            name="horario"
                            onChange={(event) => { setHora(event.target.value) }}
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Seleccione un horario disponible</option>
                            {horarios.length !== 0 && horarios.map((hor, index) => (
                                <option key={index} value={hor.horario}>{hor.horario}</option>
                            ))}
                        </select>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={(e)=>handleReservar(e)}
                        >
                            Reservar
                        </button>
                    </div>
                </form>
            </div>
        </>
    )



}