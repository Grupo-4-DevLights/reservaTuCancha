import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar";
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
      <NavBar />
      <div className="flex w-screen h-screen flex-col items-center bg-gray-200">
        <form
          onSubmit={onFormSubmit}
          className="mt-5 p-4 flex-wrap mx-auto bg-white shadow-md rounded-lg min-w-[300px] w-1/3"
        >
          <h3 className="text-3xl font-bold text-center w-full mb-6">
            Iniciar Sesion
          </h3>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-800" id="email">
              Email
            </label>
            <input
              autoFocus
              value={email}
              type="email"
              placeholder="example@mail.com"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="w-full">
            <p className="text-red-500 font-bold text-center uppercase">
              {error}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 font-bold text-gray-800"
              id="contrasena"
            >
              Contraseña
            </label>
            <input
              value={password}
              type="password"
              placeholder="contraEpica123"
              id="contrasena"
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            className="font-bold mt-5 w-full rounded-lg px-6 py-3 bg-gradient-to-tr from-emerald-500 to-emerald-700 hover:to-green-500 text-white"
            type="submit"
          >
            Ingresar
          </button>
          <h1 className="mt-5 font-bold text-center text-c w-full">
            No tienes cuenta?{" "}
            <NavLink to="/registrar" className="text-green-600">
              Registrarte
            </NavLink>
          </h1>
        </form>
      </div>
    </>
  );
}