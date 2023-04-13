import React from 'react'
import svgJugandoFutbol from '../../assets/icons/jugandoFutbol.svg'
import svgCrearCuenta from '../../assets/icons/crearCuenta.svg'
import svgReservaConfirmada from '../../assets/icons/reservaConfirmada.svg'
import svgBuscarCancha from '../../assets/icons/buscarCancha.svg'

export function Description() {
  return (
    <div className='w-full h-[50vh] p-16'>
        <div className="flex justify-between items-center h-full bg-slate-200 rounded-2xl px-64 text-center py-8" >
          <div className='border-2  max-w-[15vw] h-full  justify-center items-start flex flex-wrap space-y-4  '>
              <img src={svgCrearCuenta} alt="" className='p-8  border h-[20vh]' />
              <h1 className='font-sans font-bold uppercase'>Crea una cuenta</h1>
              <p>Hacete socio y disfruta de todos los beneficios</p>
          </div>
          <div className='border-2  max-w-[15vw]  h-full justify-center items-start flex flex-wrap space-y-4 '>
              <img src={svgBuscarCancha} alt="" className='p-8  border  h-[20vh]' />
              <h1 className='font-sans font-bold uppercase'>Busca tu cancha</h1>
              <p>Busca tu cancha favorita y reservala</p>
          </div>
          <div className='border-2  max-w-[15vw] h-full  justify-center items-start flex flex-wrap space-y-4'>
              <img src={svgReservaConfirmada} alt="" className='p-8  border h-[20vh]' />
              <h1 className='font-sans font-bold uppercase'>Reservala</h1>
              <p>Reserva tu cancha y disfruta</p>
          </div>
          <div className='border-2  max-w-[15vw] h-full  justify-center items-start flex flex-wrap space-y-4'>
              <img src={svgJugandoFutbol} alt="" className='p-8  border h-[20vh] ' />
              <h1 className='font-sans font-bold uppercase'>Y juga!</h1>
              <p>Disfruta de tu cancha y de tu deporte favorito</p>
          </div>
        </div>
    </div>
  )
}
