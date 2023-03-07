import React from 'react'
import imagenRoute from '../../../assets/jugador-futbol.png'

export function FormAddProfile() {
  return (
    <>
        <div className="container mx-auto justify-center items-center flex flex-col my-9">
            <div id="title" className='my-8 text-5xl'>
                <h1>Agregar Empresa</h1>
            </div>
            <form action="" className='flex flex-wrap text-center justify-center space-y-2 space-x-7 text-xl' id="forms">
                <div className="flex w-full my-5">
                    <div className="flex flex-col space-y-2">
                        <label id="name">Nombre de la Empresa</label>
                        <input type="text" placeholder='Nombre de empresa' id="name"/>
                        <label id="direccion">Direccion de la Empresa</label>
                        <input type="text" placeholder='Direccion' />
                        <label id="telefono">Telefono</label>
                        <input type="number" placeholder='0303456' />
                        <label ide="link">Link de Pago</label>
                        <input type="text" placeholder='https://google.com' />
                    </div>
                    <div className="flex-col flex justify-start items-center">
                        <img src={imagenRoute} alt="" className='w-[8vh] border-2 border-gray-500 rounded-full p-1' />
                        <button className='text-base bg-gray-500 py-1 px-2 rounded-xl my-2'>Cambiar imagen</button>
                    </div>
                </div>
                
                <button className=' bg-green-400 rounded-xl my-9 w-1/2 '>Enviar</button>
            </form>
        </div>
    </>
  )
}
