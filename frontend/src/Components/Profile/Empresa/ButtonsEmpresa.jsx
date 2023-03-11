import React from 'react'

export  function ButtonsEmpresa() {
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
