import React from 'react'
import { NavBar } from '../../../../Components/NavBar'
import {ImagenYrecursos} from './ImagenYrecursos'
import { DatosPersonales } from './DatosPersonales'
export function IndexSocio() {
    return (
        <>
            <NavBar />
            <div className="h-screen mx-auto container flex flex-wrap text-xl">
                <div className="w-1/2 " >
                    <DatosPersonales />
                </div>
                <div className="w-1/2 " >
                    <ImagenYrecursos />
                </div>
            </div>
        </>
    )
}
