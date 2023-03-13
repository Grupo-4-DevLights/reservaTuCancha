import React from 'react'
import { NavBar } from '../Components/NavBar'
import { DatosPersonales } from '../Components/Profile/DatosPersonales'
import { ImagenYrecursos } from '../Components/Profile/ImagenYrecursos'
import { LayoutProfile } from '../Components/Profile/LayoutProfile'

export function IndexProfile() {
  return (
        <>
            <NavBar/>
            <LayoutProfile>
                <div className="flex flex-col-2 h-screen content-start space-x-[5vw] mt-10">
                  <DatosPersonales/>
                  <ImagenYrecursos/>
                </div>

            </LayoutProfile>
        </>
  )
}
