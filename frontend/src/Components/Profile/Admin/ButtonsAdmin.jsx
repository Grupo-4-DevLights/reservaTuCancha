import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ButtonsAdmin() {
    return (
        <>
            <div className="flex flex-col text-center">
                <NavLink to="/perfil">Modificar Perfil</NavLink>
                <NavLink to="/listar-socios">Socios</NavLink>
                <NavLink to="/lista-empresas">Empresas</NavLink>
            </div>
        </>
      )
}
