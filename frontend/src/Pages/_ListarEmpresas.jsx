import React from 'react'
import { NavBar } from '../Components/NavBar'
import { ListarEmpresas } from '../Components/Profile/Admin/ListarEmpresas'
import { LayoutProfile } from '../Components/Profile/LayoutProfile'

export default function ListarSociosPage() {
    return (
        <>
            <NavBar/>
            <LayoutProfile>
                <div className="w-3/4">
                  <ListarEmpresas />
                </div>
            </LayoutProfile>
        </>
  )
}
