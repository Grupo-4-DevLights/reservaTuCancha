import React from 'react'
import { NavBar } from '../Components/NavBar'
import ListarCanchas from '../Components/Profile/Admin/ListarCanchas'
import { LayoutProfile } from '../Components/Profile/LayoutProfile'

export default function ListarCanchasPage() {
  return (
    <>
            <NavBar/>
            <LayoutProfile>
                <div className="w-3/4">
                  <ListarCanchas />
                </div>
            </LayoutProfile>
        </>
  )
}
