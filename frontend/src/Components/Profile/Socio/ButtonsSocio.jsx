import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonsSocio() {
  return (
    <> 
      <div className="flex flex-row text-center h-10 items-center text-white text-xl p-8 font-medium font-sans">
        <Link to="/perfil" className="mx-5 p-1 px-2 rounded-md hover:text-emerald-700">Modificar Perfil</Link>
        <Link to="/reservas" className="mx-5 p-1 px-2 rounded-md hover:text-emerald-700">Mis Reserva</Link>
        <Link to="/notificaciones" className="mx-5 p-1 px-2 rounded-md hover:text-emerald-700">Notificaciones</Link>
      </div>
    </>
  )
}
