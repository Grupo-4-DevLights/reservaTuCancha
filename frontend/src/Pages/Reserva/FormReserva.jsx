import React from 'react'
import { Form } from 'react-router-dom'

export  function FormReserva() {

console.log(new Date() )    
  return (
    <>
    <div className='p-4  border border-color2'>
        <form className='grid grid-cols-1 '>
            <label id="data">Fecha</label>
            <input type="date" min="2022-03-01" max="2022-03-30" id="data" pattern="d{2}-m{2}-a{2}" required/>

            <div >
                <input type="checkbox" id="hora1" />
                <label id="hora1">19:00</label>
            </div>
            <div >
                <input type="checkbox" id="hora2" />
                <label id="hora2">20:00</label>
            </div>
            <div >
                <input type="checkbox" id="hora3" />
                <label id="hora3">21:00</label>
            </div>
            <div >
                <input type="checkbox" id="hora4" />
                <label id="hora4">22:00</label>
            </div>
            <div >
                <input type="checkbox" id="hora5" />
                <label id="hora5">23:00</label>
            </div>
            
            <button className='bg-color3 rounded' >Reservar</button>
        </form>
    </div>
        
    </>
  )
}
