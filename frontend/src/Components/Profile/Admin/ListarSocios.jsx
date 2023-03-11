import React, { useEffect, useState } from 'react'
import { obtenerSocios } from '../../../Services/Admin';
import TableLayout from '../TableLayout';

export function ListarSocios() {
    const [socios, setSocios] = useState([]);

    useEffect(()=>{
        obtenerSocios()
        .then((data)=>{
            setSocios(data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    

  return (
    <>
        
        <div className="flex flex-col ">
            <div className="flex justify-center  text-center text-3xl font-bold w-full mb-8">
                <h1>Listar Usuarios</h1>
            </div>
            <div className="flex">
                <TableLayout 
                    data={socios}
                />
            </div>
            <div className="flex justify-center mt-8 text-center text-3xl font-bold w-full mb-8">
                <h1>Modificar Usuario</h1>
            </div>
        </div>
        
    </>
  )
}
