import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ButtonsSocio() {
  return (
    <>
        <div className="flex flex-col">
            <NavLink to="/perfil">Modificar Perfil</NavLink>
            <NavLink to="/reservas">Mis Reservas</NavLink>
            <NavLink to="/notificaciones">Notificaciones</NavLink>
        </div>
    </>
  )
}
