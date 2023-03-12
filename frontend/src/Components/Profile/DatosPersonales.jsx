import React, { useEffect, useState } from 'react'
import { decodificar, useAppContext } from '../../context/userContext';
import { modifyUser, obtenerSociosConId } from '../../Services/Admin';

export function DatosPersonales() {
    const {user, setUser} = useAppContext();
    const [enable, setEnable] = useState('disable');
    const [formValues, setFormValues] = useState({
      nombre: user?.nombre || "",
      email: user?.email || "",
      rol: user?.rol || "",
      password: user?.password || ""
    });


    function DisabledButton(){
      setEnable(!enable)
    }

    async function EnviarDatos(e){
      e.preventDefault();
      modifyUser(formValues).then((data) => {
        console.log("Usuario Modificado", data);
      });
      setUser(formValues)
      setEnable(!enable)
    }


    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormValues((prev) => ({ ...prev, [name]: value }));
    };

  return (
    <>
    <div className="flex flex-col text-center">
            <h3 className='text-4xl mb-8'>Datos Personales</h3>
            <form onSubmit={EnviarDatos}>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                    <p>Nombre</p>
                    <input disabled={enable} type="text" name="nombre" value={formValues?.nombre} onChange={handleChange} />
                </div>
                <div className="flex gap-4">
                    <p>Email</p>
                    <input disabled={enable} type="text" name="email" value={formValues?.email} onChange={handleChange} />
                </div>
                <div className="flex gap-4">
                    <p>Contraseña</p>
                    <input disabled={enable} type="text" name="password" value={formValues?.password} onChange={handleChange}/>
                </div>
                <div className="flex gap-4">
                    <p>Categoria</p>
                    <input disabled={enable} type="text" name="rol" value={formValues?.rol} onChange={handleChange}/>
                </div>
              </div>
              {enable &&
                <button className='bg-gray-300 py-2 px-4 rounded-xl my-8' onClick={DisabledButton}>Modificar Datos</button>
              }
              {!enable &&
                <button className='bg-green-300 py-2 px-4 rounded-xl my-8' type="submit" >Enviar Modificaciones</button>
              }
            </form>
            
    </div>
    </>
  )
}
