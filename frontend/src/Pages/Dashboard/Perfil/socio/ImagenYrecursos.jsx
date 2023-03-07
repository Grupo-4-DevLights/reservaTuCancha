import React from 'react'
import imagenRoute from '../../../assets/jugador-futbol.png'

export function ImagenYrecursos() {
  return (
    <>
        <div className="flex flex-wrap gap-4 flex-col justify-center items-center h-screen">
            <div className=' rounded-full border border-gray-300 overflow-hidden w-[8vw] h-[16vh] p-4 flex'>
                <img src={imagenRoute} className="" />            
            </div>
            <button className='bg-slate-300 py-2 px-4 rounded-xl' >Modificar Imagen</button>
        </div>
    </>
  )
}
