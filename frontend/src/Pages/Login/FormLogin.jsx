import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { loginUser } from '../../Services/Users';

export function FormLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    async function onFormSubmit (event) {
        event.preventDefault();
        const data = await loginUser({
            email,
            password
        }).then((data) => {
            if(!data.success){
                setError(data.message);
            }else{
                window.localStorage.setItem('token', data.token);
                navigate('/dashboard');
            }
        })
    }
  return (
    <>
    <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
            <form onSubmit={onFormSubmit} className='grid grid-cols-1 space-y-5' >
                <input type="text" placeholder='email' onChange={event => setEmail(event.target.value)} />
                <input type="password" placeholder='password' onChange={event => setPassword(event.target.value)}/>
                <button className='bg-color3 rounded p-4' type='submit'>Enviar</button>
                <p>{error}</p>
            </form>
        </div>
    </div>
    </>
  )
}
