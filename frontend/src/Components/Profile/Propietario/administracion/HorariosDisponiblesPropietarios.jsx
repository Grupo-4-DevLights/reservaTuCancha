import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CanchasDisponiblesFecha } from '../../../../Services/Canchas'
import ButtonsPropietario from './ButtonsPropietario'
import { useAppContext } from '../../../../context/userContext'
import { NavBar } from '../../../Socio/NavBar'

const HorariosDisponiblesPropietarios = () => {
    const { user } = useAppContext()
    const { id, dia } = useParams()
    const [horarios, setHorarios] = useState([])
    const [loading, setLoading] = useState(false)

    const cargarCanchas = async () => {
        setLoading(true)
        try {
            const data = await CanchasDisponiblesFecha(id, dia)
            setHorarios(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        cargarCanchas()
    }, [setHorarios])

    if (!user) {
        return <p>El usuario no está logueado</p>
    }

    if (loading) {
        return <h1>Cargando....</h1>
    }

    return (
        <>
            <NavBar />
            <ButtonsPropietario />

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                <table style={{ width: "50vw" }} className="divide-gray-800 shadow-md mt-20 border-10 mb-20">
                    <thead className="bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Horario
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {horarios.map((hora, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 align-top whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{hora.horario}</div>
                                </td>
                                <td className="px-6 py-4 align-top whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${hora.estado === 'Disponible' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {hora.estado}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default HorariosDisponiblesPropietarios