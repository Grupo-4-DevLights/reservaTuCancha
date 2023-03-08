import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { registerUser } from "../../Services/Users";
import ErrorModal from "./ErrorModal";
import RegisterModal from "./RegisterModal";

export function FormRegister() {
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [nombre, setNombre] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setrePassword] = useState();

  const handleModalClose = () => {
    setShowModal(false); // Ocultar la modal cuando se cierra
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false); // Ocultar la modal cuando se cierra
  };

  async function onFormSubmit(event) {
    event.preventDefault();
    if (password !== rePassword) {
      setShowErrorModal(true);
    } else {
      const data = await registerUser({
        nombre,
        email,
        password,
      });
      setShowModal(true);
    }
  }

  return (
    <>
      <div className="flex w-screen h-screen flex-col justify-center items-center bg-gray-200">
        <form
          onSubmit={onFormSubmit}
          className="p-4 flex-wrap w-1/3 mx-auto bg-white shadow-md rounded-lg"
        >
          <h3 className="text-3xl font-bold text-center w-full mb-6">
            Registrarse
          </h3>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 font-bold text-gray-800"
            >
              Nombre
            </label>
            <input
              autoFocus
              required
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
              required
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
              required
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
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              value={rePassword}
              placeholder="contraEpica123"
              onChange={(event) => setrePassword(event.target.value)}
            />
          </div>
          <button
            className="mt-5 w-full rounded-lg px-6 py-3 bg-gradient-to-r from-black text-white hover:to-black"
            type="submit"
          >
            Registrarme
          </button>

          <RegisterModal isOpen={showModal} onClose={handleModalClose} />
          <ErrorModal isOpen={showErrorModal} onClose={handleErrorModalClose} />
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
