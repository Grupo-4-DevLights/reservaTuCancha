import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../Services/Authentication";

export function NavBar() {
  const navigate = useNavigate();
  const {user, setUser} = useAppContext();

  const logoutSubmit = ()=>{
    localStorage.removeItem('token');
    setUser(undefined)
    navigate("/")
  }

  const SiginSubmit = ()=>{
    navigate("/ingresar")
  }


  return (
    <div className=" bg-color3 sticky top-0 ">
      <nav className="container mx-auto h-16 flex items-center justify-between px-4">
            {/* This is the logo */}
          <div className="flex items-center">
            <img className="h-12 w-12" src="soccer.ico" alt="logo" />
            <h1 className="text-2xl text-color1 ml-2">DevSports</h1>
          </div>
          {/* // This is the div for buttons */}
          {user && (<h1>{user.nombre}</h1>)}

          <div className="space-x-5">
            <Link to="/">Inicio</Link>
            {!user && (
              <button className=" bg-color5 p-3 rounded-lg hover:bg-color2 mr-2" onClick={SiginSubmit}>
                Iniciar Sesion
              </button>
            )}
            {user && (
              <>
                <Link to="/perfil">Perfil</Link>
                <button className=" bg-color5 p-3 rounded-lg hover:bg-color2 mr-2" onClick={logoutSubmit}>
                SALIR
                </button>
              </>
            )}
            
          </div>
  
      </nav>
    </div>
  );

}
