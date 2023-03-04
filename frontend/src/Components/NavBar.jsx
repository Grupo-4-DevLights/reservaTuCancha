import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Services/userContext";

export function NavBar() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  if(user.user !== undefined){
  console.log(user.user)
  }

  const logoutSubmit = ()=>{
    localStorage.removeItem('token');
    // storage.clear();
    navigate("/login")
  }

  return (
    <div className=" bg-color3 sticky top-0 ">
      <nav className="container mx-auto h-16 flex items-center justify-between px-4">
            {/* This is the logo */}
          <div className="flex items-center">
            <img className="h-12 w-12" src="soccer.ico" alt="logo" />
            <h1 className="text-2xl text-color1 ml-2">DevSports</h1>
          </div>
          {user.user && (
            <p>{user.user.nombre}</p>
          )}
          {/* // This is the div for buttons */}
          <div>
          <button className=" bg-color5 p-3 rounded-lg hover:bg-color2 mr-2">
              Boton1
            </button>
            <button className=" bg-color5 p-3 rounded-lg hover:bg-color2 mr-2" onClick={logoutSubmit}>
              SALIR
            </button>
          </div>
 
      </nav>
    </div>
  );
}
