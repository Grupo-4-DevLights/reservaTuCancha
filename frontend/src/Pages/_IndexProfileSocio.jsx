import React from 'react'
import { NavBar } from '../Components/NavBar'
import { DatosPersonales } from '../Components/Profile/DatosPersonales'
import { LayoutProfile } from '../Components/Profile/LayoutProfile'

export function IndexProfile() {
  return (
        <>
            <NavBar/>
            
            <LayoutProfile>
                <DatosPersonales/>
            </LayoutProfile>
        </>
  )
}
