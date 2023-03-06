import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../Services/Authentication'

export  function IndexDashboard() {
  const {user, isUserLoaded} = useAppContext()
  const navigate = useNavigate();

  useEffect(() => {
    if(isUserLoaded){
      if(user){
        navigate("/perfil")
      }else{
        navigate("/ingresar")
      }
    }
  },[isUserLoaded])


}
