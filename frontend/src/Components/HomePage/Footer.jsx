import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faWhatsapp, faFacebook } from '@fortawesome/free-brands-svg-icons'


export function Footer() {
  return (
    <div className='bg-[#eee]'>
        <div className='h-[10vh] mx-16 flex items-center justify-between'>
            <div className='flex items-center'>
                <a href="/">
                    <img src='/logo1.png' alt='logo dev sports' className='w-1/2 ' />
                </a>
            </div>
            <div className='flex items-center'>
                <a href='#' className='text-gray-500 hover:text-gray-700 mx-2 text-xl'>
                <FontAwesomeIcon icon={faInstagram} className='text-xl' />
                </a>
                <a href='#' className='text-gray-500 hover:text-gray-700 mx-2 text-xl'>
                <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href='#' className='text-gray-500 hover:text-gray-700 mx-2 text-xl'>
                <FontAwesomeIcon icon={faWhatsapp} />
                </a>
                <a href='#' className='text-gray-500 hover:text-gray-700 mx-2 text-xl'>
                <FontAwesomeIcon icon={faFacebook} />
                </a>
            </div>
        </div>
        <div className="flex">
            <p className='text-sm ml-2 text-center w-full'>DevSport © 2021 - Todos los derechos reservados</p>
        </div>
    </div>
  )
}
