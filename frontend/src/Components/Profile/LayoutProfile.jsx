import React from 'react'
import { Aside } from './Aside'
export function LayoutProfile({children}) {
  return (
    <div className="flex flex-col-2 h-screen">
                <div className="w-[20vw]">
                    <Aside />
                </div>
                <div className="w-[80vw]">
                    {children}
                </div>
            </div>
  )
}
