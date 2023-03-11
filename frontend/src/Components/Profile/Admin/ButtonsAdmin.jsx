import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ButtonsAdmin() {
    return (
        <div>
            <li><NavLink to="/perfil">Modificar Perfil</NavLink></li>
            <li><NavLink to="/lista-socios">Socios</NavLink></li>
            <li><NavLink to="/empresas">Empresas</NavLink></li>
        </div>
      )
}
