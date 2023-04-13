import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/userContext'

export  function IndexDashboard() {
  const {user, isLoggedIn} = useAppContext()
  const navigate = useNavigate();

  useEffect(() => {
    if(isLoggedIn){
      if(user){
        navigate("/perfil")
      }else{
        navigate("/ingresar")
      }
    }
  },[isLoggedIn])


}
