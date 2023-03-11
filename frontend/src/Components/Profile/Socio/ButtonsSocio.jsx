import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ButtonsSocio() {
  return (
    <div>
        <li><NavLink to="/perfil">Modificar Perfil</NavLink></li>
        <li><NavLink to="/reservas">Mis Reservas</NavLink></li>
        <li><NavLink to="/notificaciones">Notificaciones</NavLink></li>
    </div>
  )
}
