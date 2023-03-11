import React from 'react'
import { NavBar } from '../Components/NavBar'
import { ListarSocios } from '../Components/Profile/Admin/ListarSocios'
import { LayoutProfile } from '../Components/Profile/LayoutProfile'

export default function ListarSociosPage() {
    return (
        <>
            <NavBar/>
            <LayoutProfile>
                <div className="w-3/4">
                  <ListarSocios />
                </div>
            </LayoutProfile>
        </>
  )
}
