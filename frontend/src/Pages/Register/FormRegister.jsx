import React, { useState } from 'react'
import { registerUser } from '../../Services/Users';

export function FormRegister() {

    const [nombre, setNombre] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [rol, setRol] = useState();

    async function onFormSubmit (event) {
        event.preventDefault();
        const data = await registerUser({
            nombre,
            email,
            password,
            rol
        })
        
    }

  return (
    <>
    <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
            <form onSubmit={onFormSubmit} className='grid grid-cols-1 space-y-5' >
                <input type="text" placeholder='nombre' onChange={event => setNombre(event.target.value)} />
                <input type="text" placeholder='email' onChange={event => setEmail(event.target.value)} />
                <input type="password" placeholder='password' onChange={event => setPassword(event.target.value)}/>
                <input type="text" placeholder='rol'onChange={event => setRol(event.target.value)}/>
                <button className='bg-color3 rounded p-4' type='submit'>SUBMIT</button>
            </form>
        </div>
    </div>
    </>
  )
}
