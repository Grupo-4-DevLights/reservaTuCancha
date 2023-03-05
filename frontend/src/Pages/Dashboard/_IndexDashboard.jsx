import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../Services/Authentication'

export  function IndexDashboard() {
  const {user, isLoading} = useAppContext()
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Dashboard", isLoading)
    if(!isLoading){
      if(user){
        return navigate("/perfil")
      }else{
        return navigate("/ingresar")
      }
    }
  },[isLoading])


}
