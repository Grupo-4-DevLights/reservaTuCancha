import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { NavBar } from './NavBar'



export default function SelectorDeDias() {


  const { id } = useParams();

  const diasDeLaSemana = {};
  const nombresDia = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  
  let num = 0;
  const fechaActual = new Date();
  
  while(num < 7) {
    const fecha = new Date(fechaActual);
    
    // Obtiene el día de la semana de la fecha actual y suma ese valor a num
    // para obtener el índice correcto del día de la semana en el array nombresDia
    const diaSemana = fecha.getDay();
    const indiceDia = (diaSemana + num) % 7;
  
    fecha.setDate(fechaActual.getDate() + num);
  
    const fechaHoy = fecha.toISOString().slice(0, 10);
  
    diasDeLaSemana[nombresDia[indiceDia]] = fechaHoy;
    num++;
  }
  
  console.log(diasDeLaSemana);

  const [diaSeleccionado, setDiaSeleccionado] = useState('');

  const toggleDia = (dia) => {
    if (diaSeleccionado === dia) {
      setDiaSeleccionado('');
    } else {
      setDiaSeleccionado(dia);
    }
  };

  return (
    
    <div className="flex flex-col items-center ">
      <NavBar />
      <div>
        <h1 className="text-2xl font-bold mb-10 mt-10">Selecciona un día de la semana que desea alquilar para reservar un horario</h1>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-10 mt-10">Selecciona un día de la semana que desea alquilar para reservar un horario</h1>
      </div>
      
      <div className="grid grid-cols-7 gap-4">
        
        {nombresDia.map((dia) => (
          <Link
            key={dia}
            to={`/socio/elegirhorario/${id}/${diasDeLaSemana[dia]}`}
            className={`p-4 border-2 rounded ${diaSeleccionado === dia ? 'border-blue-500 bg-blue-100 ' : 'border-gray-300 bg-gray-100 hover:bg-red-500'}`}
            onClick={() => setDiaSeleccionado(dia)}
          >
            {dia}
          </Link>
        ))}
      </div>
    </div>
  );
}



