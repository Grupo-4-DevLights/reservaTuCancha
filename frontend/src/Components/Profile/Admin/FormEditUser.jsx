import React, { useEffect, useState } from "react";

export function FormEditUser({ user, onSaveUser }) {
  const [formValues, setFormValues] = useState({
    nombre: user?.nombre || "",
    email: user?.email || "",
    rol: user?.rol || "",
    password: user?.password || ""
  });

  useEffect(() => {
    setFormValues(user);
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveUser(formValues);
  };

  return (
      <div className="flex w-screen h-screen flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="mt-5 p-4 flex-wrap mx-auto bg-white shadow-lg rounded-lg min-w-[300px] w-1/3"
        >
          <h3 className="text-3xl font-bold text-center w-full mb-6">
            Modificar Datos
          </h3>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-800" id="email">
              Nombre
            </label>
            <input
              autoFocus
              type="text"
              name="nombre"
              value={formValues.nombre}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 font-bold text-gray-800"
              id="contrasena"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-800" id="email">
              Password
            </label>
            <input
              type="text"
              name="password"
              value={formValues.password || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-800" id="email">
              Rol
            </label>
            <input
              type="text"
              name="rol"
              value={formValues.rol}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            className="font-bold mt-5 w-full rounded-lg px-6 py-3 bg-gradient-to-tr from-emerald-500 to-emerald-700 hover:to-green-500 text-white"
            type="submit"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
  );
}
