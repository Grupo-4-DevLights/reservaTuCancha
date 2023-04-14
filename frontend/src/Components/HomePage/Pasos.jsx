import React from 'react'
import svgJugandoFutbol from '../../assets/jugandoFutbol.svg'
import svgCrearCuenta from '../../assets/crearCuenta.svg'
import svgReservaConfirmada from '../../assets/reservaConfirmada.svg'
import svgBuscarCancha from '../../assets/buscarCancha.svg'
import { useEffect } from 'react'
import { useState } from 'react'

export function Pasos() {
    const [elementos, setElementos] = useState([
        {
          titulo: "Crear cuenta",
          descripcion: "Hacete socio y disfruta de todos los beneficios",
          imagen: svgCrearCuenta,
          estilo: { backgroundColor: "#2FC790" },
        },
        {
          titulo: "Busca tu cancha",
          descripcion: "Busca tu cancha favorita y reservala",
          imagen: svgBuscarCancha,
          estilo: { backgroundColor: "#2FC790" },
        },
        {
          titulo: "Reservala",
          descripcion: "Reserva tu cancha y disfruta",
          imagen: svgReservaConfirmada,
          estilo: { backgroundColor: "#2FC790" },
        },
        {
          titulo: "Y juga!",
          descripcion: "Disfruta de tu cancha y de tu deporte favorito",
          imagen: svgJugandoFutbol,
          estilo: { backgroundColor: "#2FC790" },
        },
      ]);
      const [indice, setIndice] = useState(0);
      
      useEffect(() => {
        const interval = setInterval(() => {
          setIndice((indice) => (indice + 1) % elementos.length);
        }, 2000);
      
        return () => clearInterval(interval);
      }, [elementos]);
      
      return (
        <div className="w-full h-[50vh] p-16">
          <div className="flex justify-between items-center h-full bg-slate-200 rounded-2xl px-64 text-center ">
            {elementos.map((elemento, index) => (
              <div
                key={index}
                className="border-2 max-w-[15vw] h-full justify-center items-start flex flex-wrap space-y-4 px-4"
                style={indice === index ? elemento.estilo : { backgroundColor: "#e5e7eb" }}
              >
                <img src={elemento.imagen} alt="" className="p-8 h-[20vh]" />
                <div className='space-y-2'>
                    <h1 className="font-sans font-bold uppercase">{elemento.titulo}</h1>
                    <p>{elemento.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}
