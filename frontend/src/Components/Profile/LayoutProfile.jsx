import React from 'react'
import { useAppContext } from '../../context/userContext';
import ButtonsAdmin from './Admin/ButtonsAdmin';
import { Aside } from './Aside'
import { ButtonsEmpresa } from './Empresa/ButtonsEmpresa';
import ButtonsSocio from './Socio/ButtonsSocio';
export function LayoutProfile({children}) {
    const {user} = useAppContext();
  return (
    <div className="flex flex-col-2 h-screen">
                <div className="w-[15vw]">
                    <div className='flex flex-col justify-center'>
                        {user && (
                            user.rol === "socio" ? (<Aside ><ButtonsSocio/></Aside>) :
                            user.rol === "administrador" ? (<Aside ><ButtonsAdmin/></Aside>) :
                            (<Aside ><ButtonsEmpresa/></Aside>)
                        )}
                    </div>
                </div>
                <div className="w-[85vw] flex justify-center content-start mt-6	">
                    {children}
                </div>
            </div>
  )
}
