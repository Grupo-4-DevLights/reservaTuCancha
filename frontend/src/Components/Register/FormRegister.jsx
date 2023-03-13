import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { NavBar } from "../../Components/NavBar";
import { registerUser } from "../../Services/Users";
import Swal from "sweetalert2";

export function FormRegister() {
  const [nombre, setNombre] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setrePassword] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function onFormSubmit(event) {
    event.preventDefault();
    if (password !== rePassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas deben coincidir",
        confirmButtonText: "Aceptar",
      });
    } else {
      const data = await registerUser({
        nombre,
        email,
        password,
      }).then((data) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Registro completo",
            confirmButtonText: "Aceptar",
          }).then(() => navigate("/ingresar"));
        } else {
          setError(data.message);
        }
      });
    }
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
            Registrarse
          </h3>
          <div className="w-full">
            <p className="text-red-500 font-bold text-center uppercase">
              {error}
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 font-bold text-gray-800"
            >
              Nombre
            </label>
            <input
              autoFocus
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              value={nombre}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="email"
              value={email}
              placeholder="example@mail.com"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              value={password}
              placeholder="contraEpica123"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="repassword"
              className="block mb-2 font-bold text-gray-800"
            >
              Repetir Contraseña
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              value={rePassword}
              placeholder="contraEpica123"
              onChange={(event) => setrePassword(event.target.value)}
            />
          </div>
          <button
            className="font-bold mt-5 w-full rounded-lg px-6 py-3 bg-gradient-to-tr from-emerald-500 to-emerald-700 hover:to-green-500 text-white"
            type="submit"
          >
            Registrarme
          </button>
          <h1 className="mt-5 font-bold text-center text-c w-full">
            Ya tienes cuenta{" "}
            <NavLink to="/ingresar" className="text-green-600">
              Ingresar
            </NavLink>
          </h1>
        </form>
      </div>
    </>
  );
}
