import React from 'react'
import { useAppContext } from '../../../Services/Authentication'

export function DatosPersonales() {
    const {user} = useAppContext();

  return (
    <>
    <div className="container mx-auto h-screen flex text-center">
            <h3 className='text-xl'>Datos Personales</h3>
            <div className="grid grid-colums-2">
                <p>Nombre</p>

            </div>
    </div>
    </>
  )
}
