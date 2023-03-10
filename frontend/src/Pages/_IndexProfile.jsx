import React from 'react'
import { NavBar } from '../Components/NavBar'
import { Aside } from '../Components/Profile/Aside'
import { DatosPersonales } from '../Components/Profile/DatosPersonales'

export function IndexProfile() {
  return (
        <>
            <NavBar/>
            <div className="mt-[5%] flex flex-col-2 h-screen">
                <div className="w-[20vw]">
                    <Aside />
                </div>
                <div className="w-[80vw]">
                    <DatosPersonales/>
                </div>
            </div>
        </>
  )
}
