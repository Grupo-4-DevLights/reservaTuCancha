import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/userContext";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const EmptyComponent = () => {
    return <div className="h-10 w-10 bg-gray-200"></div>;
  };
  const navigate = useNavigate();

  const { user, setUser, setIsLoggedIn } = useAppContext();

  const logoutSubmit = () => {
    localStorage.removeItem("token");
    setUser(undefined);
    setIsLoggedIn(false);
    navigate("/ingresar");
    setIsOpen(!isOpen);
  };

  const SiginSubmit = () => {
    navigate("/ingresar");
  };

  const RegistrarSubmit = () => {
    navigate("/registrar");
  };

  return (
    <>
      <div className="flex justify-center items-center h-[96px] sm2:h-[89px] bg-black">
        <EmptyComponent />
      </div>
      <div
        id="navbar"
        className="items-center bg-image bg-transparent-300 fixed w-full top-0"
      >
        <nav className="flex text-black px-12 py-3 justify-between items-center">
          <div className="flex">
            <Link to="/" className="text-2xl font-bold ">
              <div className="flex items-center">
                <img
                  className="h-[65px] w-auto hidden sm2:block"
                  src="logo1.png"
                  alt="logo"
                />
                <img
                  className="h-[65px] w-auto block sm2:hidden"
                  src="devsports.png"
                  alt="logo"
                />
                {user && (
                  <h1 className="text-2xl font-sans px-2 py-1 rounded-lg flex ite sm2:hidden">
                    <p className="capitalize ml-2 font-medium text-emerald-700 mb-2">
                      {user.nombre}
                    </p>
                  </h1>
                )}
              </div>
            </Link>
          </div>
          <div className="hidden sm:block sm:ml-6">
            {user && (
              <h1 className="text-2xl font-sans font-medium px-2 py-1 rounded-lg hidden sm2:flex">
                Bienvenido,{" "}
                <p className="capitalize ml-2 font-medium text-emerald-700 self">
                  {user.nombre}.
                </p>
              </h1>
            )}
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <div className="space-x-5">
                <Link to="/" className="hover:underline font-sans font-bold">
                  Inicio
                </Link>
                {!user && (
                  <>
                    <button
                      className="hover:bg-emerald-600 font-sans bg-emerald-500 p-2 rounded-md text-white font-bold"
                      onClick={SiginSubmit}
                    >
                      Iniciar Sesion
                    </button>
                    <button
                      className="hover:bg-emerald-600 font-sans bg-emerald-500 p-2 rounded-md text-white font-bold"
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
                      className="hover:bg-emerald-600 font-sans bg-emerald-500 p-2 rounded-md text-white font-bold"
                    >
                      Perfil
                    </Link>
                    <button
                      className="hover:bg-emerald-600 font-sans bg-emerald-500 p-2 rounded-md text-white font-bold"
                      onClick={logoutSubmit}
                    >
                      Salir
                    </button>
                    { user.rol ==="socio" &&
                    <Link
                      to="/socio/elegirempresa"
                      className="hover:bg-emerald-600 font-sans bg-emerald-500 p-2 rounded-md text-white font-bold"
                    >
                      Buscar canchas
                    </Link>
                    }
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="fixed right-1 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md bg-emerald-500 text-white hover:text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
        <div className={`${isOpen ? "fixed w-full" : "hidden"} sm:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 absolute w-full text-center bg-emerald-300 ">
            <Link
              to="/"
              className="text-white w-full block hover:bg-emerald-400 font-sans p-2 rounded-md font-bold"
            >
              Inicio
            </Link>
            {!user && (
              <>
                <button
                  className="text-white w-full block hover:bg-emerald-400 font-sans p-2 rounded-md font-bold "
                  onClick={SiginSubmit}
                >
                  Iniciar Sesion
                </button>
                <button
                  className="text-white w-full block hover:bg-emerald-400 font-sans  p-2 rounded-md font-bold "
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
                  className="text-white w-full block hover:bg-emerald-400 font-sans p-2 rounded-md font-bold"
                >
                  Perfil
                </Link>
                <button
                  className="text-white w-full block hover:bg-emerald-400 font-sans p-2 rounded-md font-bold"
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
