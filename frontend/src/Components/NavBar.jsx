import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/userContext";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const { user, setUser, setIsLoggedIn } = useAppContext();

  const logoutSubmit = () => {
    localStorage.removeItem("token");
    setUser(undefined);
    setIsLoggedIn(false);
    navigate("/ingresar");
    setIsOpen(!isOpen)
  };

  const SiginSubmit = () => {
    navigate("/ingresar");
  };

  const RegistrarSubmit = () => {
    navigate("/registrar");
  };

  return (
    <>
      <div className="sticky top-0">
        <nav className="flex bg-gray-800 text-white px-12 py-3 justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold">
              <div className="flex items-center">
                <img
                  className=" h-16 w-16 mr-3 hidden sm:block sm:ml-6"
                  src="soccer.ico"
                  alt="logo"
                />
                DevSports
              </div>
            </Link>
          </div>
          <div className="hidden sm:block sm:ml-6">
            {user && (
              <h1
                className={`text-WHITE text-2xl font-sans uppercase px-2 py-1 rounded-lg `}
              >
                {user.rol}
              </h1>
              //  ${
              //   user.rol === "socio"
              //     ? "bg-cyan-300"
              //     : user.rol === "admin"
              //     ? "bg-green-300"
              //     : user.rol === "empresa"
              //     ? "bg-blue-300"
              //     : "bg-transparent"
              // }
            )}
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <div className="space-x-5">
                <Link to="/" className="hover:underline font-sans">
                  Inicio
                </Link>
                {!user && (
                  <>
                    <button
                      className="hover:underline font-sans"
                      onClick={SiginSubmit}
                    >
                      Iniciar Sesion
                    </button>
                    <button
                      className="hover:underline font-sans"
                      onClick={RegistrarSubmit}
                    >
                      Registrarse
                    </button>
                  </>
                )}
                {user && (
                  <>
                    <Link to="/perfil" className="hover:underline font-sans">
                      Perfil
                    </Link>
                    <button
                      className="hover:underline font-sans"
                      onClick={logoutSubmit}
                    >
                      Salir
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </nav>
        <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 absolute w-full text-center">
            <Link
              to="/"
              className=" w-full  bg-slate-400 text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Inicio
            </Link>
            {!user && (
              <>
                <button
                  className=" w-full  bg-slate-400 text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={SiginSubmit}
                >
                  Iniciar Sesion
                </button>
                <button
                  className=" w-full  bg-slate-400 text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={RegistrarSubmit}
                >
                  Registrarse
                </button>
              </>
            )}
            {user && (
              <>
                <Link
                  to="/perfil"
                  className=" w-full  bg-slate-400 text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Perfil
                </Link>
                <button
                  className=" w-full  bg-slate-400 text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={logoutSubmit}
                >
                  Salir
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}