import React from 'react';
import imagenRoute from '../../Pages/assets/mclovin.jpg';

export function ImagenYrecursos() {
return (
<div className="flex flex-wrap gap-4 flex-col items-center">
<div className="rounded-lg border border-gray-300 w-[10vw] h-[20vh] p-2 flex items-center justify-center bg-gray-50 shadow-lg">
<img src={imagenRoute} className="w-full h-full object-cover" alt="Imagen de jugador de fútbol" />
</div>
<button className="bg-emerald-500 hover:bg-emerald-400 text-white py-2 px-4 rounded-lg shadow-md mt-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 font-sans font-medium">
Modificar Imagen
</button>
</div>
);
}




