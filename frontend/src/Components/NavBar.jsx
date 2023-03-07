import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/userContext";

export function NavBar() {
  const navigate = useNavigate();
  const {user, setUser, setIsLoggedIn} = useAppContext();

  const logoutSubmit = ()=>{
    localStorage.removeItem('token');
    setUser(undefined);
    setIsLoggedIn(false)
    navigate("/")
  }

  const SiginSubmit = ()=>{
    navigate("/ingresar")
  }

  const RegistrarSubmit = ()=>{
    navigate("/registrar")
  }


  return (
    <div className=" bg-orange-400 sticky top-0 ">
      <nav className="container mx-auto h-16 flex items-center justify-between px-4">
            {/* This is the logo */}
          <div className="flex items-center">
            <img className="h-12 w-12" src="soccer.ico" alt="logo" />
            <h1 className="text-2xl text-color1 ml-2">DevSports</h1>
          </div>
          {/* // This is the div for buttons */}
          {user &&
          (<h1 className={` px-2 py-1 rounded-lg ${user.rol === 'socio' ? 'bg-cyan-200' : user.rol === 'admin' ? 'bg-green-200' : user.rol === 'empresa' ? 'bg-red-200' : 'bg-transparent'} `}>{user.rol}</h1>)
          }

          <div className="space-x-5">
            <Link to="/">Inicio</Link>
            {!user && (
              <>
                <button className=" bg-cyan-600 p-2 rounded-lg hover:bg-color2 mr-2" onClick={SiginSubmit}>
                  Iniciar Sesion
                </button>
                <button className=" bg-cyan-600 p-2 rounded-lg hover:bg-color2 mr-2" onClick={RegistrarSubmit}>
                  Registrarse
                </button>
              </>
              
            )}
            {user && (
              <>
                <Link to="/perfil">Perfil</Link>
                <button className=" bg-red-700 p-2 rounded-lg hover:bg-color2 mr-2" onClick={logoutSubmit}>
                SALIR
                </button>
              </>
            )}
            
          </div>
  
      </nav>
    </div>
  );

}
