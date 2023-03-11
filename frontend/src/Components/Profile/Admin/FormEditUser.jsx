import React, { useEffect, useState } from 'react'

export function FormEditUser({user, onSaveUser}) {
    const [formValues, setFormValues] = useState({
        nombre: user?.nombre || "",
        email: user?.email || "",
        rol: user?.rol || "",
    });

    useEffect(()=>{
        setFormValues(user)
    },[user])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveUser(formValues);
    };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nombre:
          <input type="text" name="nombre" value={formValues.nombre} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={formValues.email} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Rol:
          <input type="text" name="rol" value={formValues.rol} onChange={handleChange} />
        </label>
      </div>
      <div>
        <button type="submit" className='bg-green-300 py-2 px-4 rounded'>Guardar</button>
      </div>
    </form>
  )
}
