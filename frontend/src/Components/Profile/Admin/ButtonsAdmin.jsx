import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ButtonsAdmin() {
    return (
        <>
            <div className="flex flex-row text-center h-10 items-center text-white text-xl p-8 font-medium font-sans">
                <NavLink to="/perfil" className="mx-5 bg-emerald-500 hover:bg-emerald-400 p-2 rounded-md">Perfil</NavLink>
                <NavLink to="/listar-socios" className="mx-5 bg-emerald-500 hover:bg-emerald-400 p-2 rounded-md">Socios</NavLink>
                <NavLink to="/listar-empresas" className="mx-5 bg-emerald-500 hover:bg-emerald-400 p-2 rounded-md">Empresas</NavLink>
                <NavLink to="/listar-canchas" className="mx-5 bg-emerald-500 hover:bg-emerald-400 p-2 rounded-md">Canchas</NavLink>

            </div>
        </>
      )
}
