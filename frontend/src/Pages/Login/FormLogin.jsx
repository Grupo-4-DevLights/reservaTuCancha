import React, {  useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import {  decodificar, useAppContext } from '../../context/userContext';
import { loginUser } from '../../Services/Users';

export function FormLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {setUser, setIsLoggedIn} = useAppContext();

    const navigate = useNavigate();
    async function onFormSubmit (event) {
        event.preventDefault();
        const data = await loginUser({
            email, password
        }).then((data)=>{
            if(data.success){
                localStorage.setItem('token', data.token);
                setUser(decodificar(data.token));
                setIsLoggedIn(true)
                navigate('/perfil');
            }else{
                setError(data.message)
            }
        })
    }
  return (
    <>
    <div className="container mx-auto">
        <div className="flex justify-center items-center px-6 my-12 flex-wrap">
            <div className="w-full my-5 flex justify-center ">
                <form onSubmit={onFormSubmit} className='flex flex-wrap py-7 text-white bg-slate-700 text-center justify-center  w-1/3 border border-3 border-black rounded p-3' >
                    <h3 className='text-3xl '>Ingresar</h3>
                    <label className='w-full my-3' >Ingresa los datos para ingresar</label>
                    <label className='w-full' id="email">Email</label>
                    <input type="text" placeholder='example@mail.com' id="email" onChange={event => setEmail(event.target.value)}  className="border border-1 border-gray-400 rounded px-3 py-1 w-3/4 bg-transparent text-center"/>
                    <label className='w-full mt-3' id="contrasena">Contraseña</label>
                    <input type="password" placeholder='contrasena' id="contrasena" onChange={event => setPassword(event.target.value)} className="border border-1 border-gray-400 rounded px-3 py-1 w-3/4 bg-transparent text-center"/>
                    <button className='bg-blue-500 text-white text-xl font-bold rounded-xl p-4 w-3/4 mt-8' type='submit'>Enviar</button>
                    
                </form>
            </div>
            <div className="w-full">
                <p className='text-red-500 uppercase'>{error}</p>
            </div>
        </div>
    </div>
    </>
  )
}
