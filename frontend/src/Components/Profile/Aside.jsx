import React from 'react'
import { useAppContext } from '../../context/userContext';

export  function Aside({children}) {
    const {user} = useAppContext();
  return (
    <>
    <div className="h-full">
    <div className="mb-3">
        {user && (
            <>
            <h1 className="text-WHITE text-2xl font-sans px-2 py-1 rounded-lg flex">
                Bienvenido, <p className="capitalize ml-2">{user.nombre}.</p>
            </h1>
            <p className='px-2 py-1 capitalize'>{user.rol}</p>
            </>
        )}
    
    </div>
    <div className="flex justify-center items-center text-2xl space-y-7 ">
           {children}
    </div>

    </div>
    
   

    </>
  )
}
