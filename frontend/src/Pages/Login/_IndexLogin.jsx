import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Services/Authentication';
import { FormLogin } from './FormLogin'

export  function IndexLogin() {
  const navigate = useNavigate();
  const { user , isLoading} = useAppContext();


  useEffect(() => {
    if (isLoading && user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
        <FormLogin />
    </>
  )
}
