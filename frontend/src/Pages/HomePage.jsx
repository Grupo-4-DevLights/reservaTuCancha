import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "../Components/HomePage/Hero";
import { NavBar } from "../Components/NavBar";
import { useAppContext } from "../Services/Authentication";



export function HomePage() {
  const { user , isLoading} = useAppContext();
  const navigate = useNavigate();


  useEffect(()=>{
      console.log("HomePage", user, isLoading)
      if(!isLoading){
          if(user){
              return navigate("/dashboard");
          }else{
              return navigate("/login")
          }
      }
  }, [isLoading])

  return (<>
    <NavBar />  
    <Hero />
    <Hero />

    </>
  );
}
