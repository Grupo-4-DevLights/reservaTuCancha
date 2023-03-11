import React, { useState } from 'react'
import { useAppContext } from '../../context/userContext';

export function DatosPersonales() {
    const {user} = useAppContext();
    const [enable, setEnable] = useState('disable');

    function DisabledButton(){
      setEnable(!enable)
    }

    function EnviarDatos(){
      setEnable(!enable)
    }

  return (
    <>
    <div className="flex flex-col text-center">
            <h3 className='text-4xl mb-8'>Datos Personales</h3>
            <div className="flex gap-4 flex-col">
              <div className="flex gap-4">
                  <p>Nombre</p>
                  <input disabled={enable} value={user?.nombre} />
              </div>
              <div className="flex gap-4">
                  <p>Email</p>
                  <input disabled={enable} value={user?.email} />
              </div>
              <div className="flex gap-4">
                  <p>Contraseña</p>
                  <input disabled={enable} value={user?.password} />
              </div>
              <div className="flex gap-4">
                  <p>Categoria</p>
                  <input disabled={enable} value={user?.rol} />
              </div>
            </div>
            {enable &&
              <button className='bg-gray-300 py-2 px-4 rounded-xl my-8' onClick={DisabledButton}>Modificar Datos</button>
            }
            {!enable &&
              <button className='bg-green-300 py-2 px-4 rounded-xl my-8' onClick={EnviarDatos}>Enviar Modificaciones</button>
            }
            
    </div>
    </>
  )
}
