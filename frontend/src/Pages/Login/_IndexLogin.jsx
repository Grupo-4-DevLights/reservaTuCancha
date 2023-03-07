import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/userContext';
import { FormLogin } from './FormLogin'

export  function IndexLogin() {
  const navigate = useNavigate();
  const { user , isLoggedIn} = useAppContext();


  useEffect(() => {
    if (isLoggedIn && user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <div className="h-screen justify-center items-center flex">
          <FormLogin />
      </div>
    </>
  )
}
