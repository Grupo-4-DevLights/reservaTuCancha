import React from 'react'

export  function ButtonsEmpresa() {
  return (
    <>
      <div className="flex flex-row text-center h-10 items-center text-white text-xl p-8 font-medium font-sans">
        <NavLink to="/perfil" className="mx-5 bg-emerald-500 hover:bg-emerald-400 p-2 rounded-md">Modificar Perfil</NavLink>
        <NavLink to="/reservas" className="mx-5 bg-emerald-500 hover:bg-emerald-400 p-2 rounded-md">Mis Reserva</NavLink>
        <NavLink to="/notificaciones" className="mx-5 bg-emerald-500 hover:bg-emerald-400 p-2 rounded-md">Notificaciones</NavLink>
      </div>
    </>
  )
}
