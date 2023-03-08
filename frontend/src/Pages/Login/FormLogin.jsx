import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodificar, useAppContext } from "../../context/userContext";
import { loginUser } from "../../Services/Users";

export function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser, setIsLoggedIn } = useAppContext();

  const navigate = useNavigate();
  async function onFormSubmit(event) {
    event.preventDefault();
    const data = await loginUser({
      email,
      password,
    }).then((data) => {
      if (data.success) {
        localStorage.setItem("token", data.token);
        setUser(decodificar(data.token));
        setIsLoggedIn(true);
        navigate("/perfil");
      } else {
        setError(data.message);
      }
    });
  }
  return (
    <>
      <div className="flex w-screen h-screen flex-col items-center justify-center bg-gray-200">
        <form
          onSubmit={onFormSubmit}
          className="p-4 flex-wrap w-1/3 mx-auto bg-white shadow-md rounded-lg"
        >
          <h3 className="text-3xl font-bold text-center w-full mb-6">Iniciar Sesion</h3>
          <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-800" id="email">
            Email
          </label>
          <input
            type="text"
            placeholder="example@mail.com"
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          </div>
          <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-800" id="contrasena">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="contraEpica123"
            id="contrasena"
            onChange={(event) => setPassword(event.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          </div>
          <button
            className="mt-5 w-full rounded-lg px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-600 text-white hover:from-pink-500 hover:to-purple-700"
            type="submit"
          >
            Ingresar
          </button>
        </form>

        <div className="w-full">
          <p className="text-red-500 uppercase">{error}</p>
        </div>
      </div>
    </>
  );
}
