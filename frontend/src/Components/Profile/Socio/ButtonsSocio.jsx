import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ButtonsSocio() {
  return (
    <> 
      <div className="flex flex-row text-center h-10 items-center text-white text-xl p-8 font-medium font-sans">
        <NavLink to="/perfil" className="mx-5 p-1 px-2 rounded-md hover:text-emerald-700">Modificar Perfil</NavLink>
        <NavLink to="/reservas" className="mx-5 p-1 px-2 rounded-md hover:text-emerald-700">Mis Reserva</NavLink>
        <NavLink to="/notificaciones" className="mx-5 p-1 px-2 rounded-md hover:text-emerald-700">Notificaciones</NavLink>
      </div>
    </>
  )
}
