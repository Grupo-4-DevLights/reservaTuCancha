import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserProvider, { useAppContext } from "../Services/Authentication";
import UserContext from "../Services/userContext";

export function NavBar() {
  const navigate = useNavigate();
  const user2 = useContext(UserContext);
  const {user, setUser} = useAppContext();
  if(user2){
    console.log("user context 1" ,user2.user)
    console.log("user context 2" , user)
  }

  const logoutSubmit = ()=>{
    localStorage.removeItem('token');
    setUser(undefined)
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
