import React, { useState } from "react";
import { registerUser } from "../../Services/Users";
import { useNavigate } from "react-router-dom";

export function FormRegister() {
  const [nombre, setNombre] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  async function onFormSubmit(event) {
    event.preventDefault();

    const data = await registerUser({
      nombre,
      email,
      password
    });
    alert('Sos un capo te registraste')
    navigate("/ingresar")
    console.log('hola')
  }

  return (
    <>
      <div className="flex w-screen h-screen flex-col items-center">
        <h1 className="text-[40px] font-bold font-sans m-10">Registrate gratis😎</h1>
        <form onSubmit={onFormSubmit} className="p-4 w-[400px] mx-auto">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 font-bold text-gray-800"
            >
              Nombre
            </label>
            <input
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Juanito Carlos"
              onChange={(event) => setNombre(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 font-bold text-gray-800"
            >
              Email
            </label>
            <input
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="email@email.com"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 font-bold text-gray-800"
            >
              Contraseña
            </label>
            <input
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="contraEpica123"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
          className="mt-5 w-full rounded-lg px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-600 text-white hover:from-pink-500 hover:to-purple-700"
            type="submit"
          >
            Registrarme
          </button>
        </form>
      </div>
    </>
  );
}
