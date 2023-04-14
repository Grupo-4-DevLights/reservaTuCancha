import React from 'react'
import mensajeEnviado from '../../assets/mensaje-enviado.svg'
import { useState } from 'react';
import { enviarContacto } from '../../Services/Contacto';
import Swal from 'sweetalert2'


export  function Contacto() {
        const [formData, setFormData] = useState({
            nombre: '',
            email: '',
            titulo: '',
            descripcion: ''
        });

      
        const handleChange = (e) => {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value
          });
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          if(formData.nombre === '' || formData.email === '' || formData.titulo === '' || formData.descripcion === ''){
            Swal.fire({
                title: 'Error',
                text: "Debe completar todos los campos",
                icon: "error",
                confirmButtonText: "Aceptar",
                timer: 3000,
                })
          }else{
            await enviarContacto(formData)
            .then(()=>{ 
              setFormData({
                  nombre: '',
                  email: '',
                  titulo: '',
                  descripcion: ''
                });
              Swal.fire({
                title: 'Mensaje enviado con exito!',
                text: "En breve nos comunicaremos con usted",
                icon: "success",
                confirmButtonText: "Aceptar",
                timer: 2000,
              })
            })
          }
        };

  return (
    <div className='mx-16 flex justify-center'>
            <div className="flex flex-col w-1/3 justify-center">
                    <h1 className='text-5xl text-black mb-5 font-sans font-bold'>Contactanos!</h1>
                    <p className='text-lg text-black mb-2 font-sans '>Queres que tu empresa este disponible en nuestra pagina?</p>
                    <p className='text-lg text-black mb-2 font-sans '>Tuviste algun inconveniente al operar con la pagina?</p>

                <div className='flex justify-center flex-wrap mt-4'>
                    <img src={mensajeEnviado} alt="" className='w-1/2' />
                </div> 
            </div>
            <div className="flex flex-col w-1/3 justify-center">
                <form onSubmit={handleSubmit} id="formularioContacto" className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="nombre">
                        Nombre completo
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Nombre completo"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                        Correo electrónico
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="titulo">
                        Título del mensaje
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="titulo"
                        name="titulo"
                        type="text"
                        placeholder="Título del mensaje"
                        value={formData.titulo}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="descripcion">
                        Descripción del mensaje
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="descripcion"
                        name="descripcion"
                        placeholder="Descripción del mensaje"
                        rows="4"
                        value={formData.descripcion}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="flex items-center justify-between">
                    <button
                        className="w-full bg-[#23AA7C] hover:bg-[#0C6E51] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Enviar
                    </button>
                    </div>
                </form>
            </div>
    </div>
  )
}
