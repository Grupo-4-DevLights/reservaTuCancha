import React, { useState } from 'react';

import DisponiblePropietario from './DisponiblePropietario'


import {NavBar} from '../../../NavBar'

const ButtonsPropietario = () => {
    const [mostrarComponente, setmostrarComponente] = useState(false);
    const [showList2, setShowList2] = useState(false);
    const [showList3, setShowList3] = useState(false);

    const mostrarComponente1 = () => {
        setmostrarComponente(!mostrarComponente);
        setShowList2(false);
        setShowList3(false);
    }

    const handleClick = () => {
        mostrarComponente1();
      };
    
  

  
    return (
        
      <div className="flex flex-col items-center  ">
         <NavBar />
         <p className=" text-center mt-10 mb-4"> <strong>Elija la opcion que quiere saber sobre su cancha </strong></p>
        <div className="flex">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={mostrarComponente1}
           
          >
            Disponibles
          </button>
          
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Reservada
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Confirmada
          </button>       
        </div>
        {mostrarComponente && <DisponiblePropietario/>}



{/*
        {showList1 && (
        <table className=" mt-10 border-collapse border border-gray-400 rounded-lg overflow-hidden my-4 w-4/5 h-4/5">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-2 px-3">Fecha</th>
              <th className="text-left py-2 px-3">Horario</th>
              <th className="text-left py-2 px-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100">
              <td className="text-left py-2 px-3 border border-gray-400">01/01/2022</td>
              <td className="text-left py-2 px-3 border border-gray-400">10:00 AM</td>
              <td className="text-left py-2 px-3 border border-gray-400">Pendiente</td>
            </tr>
            <tr className="bg-white">
              <td className="text-left py-2 px-3 border border-gray-400">02/01/2022</td>
              <td className="text-left py-2 px-3 border border-gray-400">02:30 PM</td>
              <td className="text-left py-2 px-3 border border-gray-400">Completado</td>
            </tr>
          </tbody>
        </table>
      )}
        */}
      </div>
    );
  }

export default ButtonsPropietario;