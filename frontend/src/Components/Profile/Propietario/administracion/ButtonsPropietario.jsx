import React, { useState } from 'react';

import DisponiblePropietario from './DisponiblePropietario'
import ReservaPropietario from './ReservaPropietario'


import {NavBar} from '../../../NavBar'

const ButtonsPropietario = () => {
    const [Componente1, SetComponente1] = useState(false);
    const [Componente2, SetComponente2] = useState(false);
    const [showList3, setShowList3] = useState(false);

    const mostrarComponente1 = () => {
        SetComponente1(!Componente1);
        setShowList2(false);
        setShowList3(false);
    }

    const mostrarComponente2= ()=>{
        SetComponente2(!Componente2);
        SetComponente1(false);
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
            onClick={mostrarComponente2}
          >
            Reservada
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Confirmada
          </button>       
        </div>
        {Componente1 && <DisponiblePropietario/>}
        {Componente2 && <ReservaPropietario/>}


      </div>
    );
  }

export default ButtonsPropietario;