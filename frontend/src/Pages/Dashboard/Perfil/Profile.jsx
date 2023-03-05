import React from 'react'
import { NavBar } from '../../../Components/NavBar'
import { useAppContext } from '../../../Services/Authentication';
import { DatosPersonales } from './DatosPersonales'

export  function Profile() {
  const {user} = useAppContext();

  if (!user) {
    return <div>Cargando usuario...</div>;
  }

  return (
  <>
    <NavBar/>
    <DatosPersonales/>
  </>
  )
}
