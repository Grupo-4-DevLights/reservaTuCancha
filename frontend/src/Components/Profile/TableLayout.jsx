import React from 'react'

export default function TableLayout({data}) {
  
    return (
      <>
        {data && data.length > 0  && (
          <table className='border-collapse table-fixed w-full text-sm text-center'>
            <thead>
              <tr className='text-xl'>
                {Object.keys(data[0]).map((title) => (
                  <th key={title}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.nombre} className="text-lg">
                  {Object.values(row).map((item) => (
                    <td>{item}</td>
                  ))}
                  <td><a className="bg-red-500">Modificar</a><a className="bg-red-500 mx-2">Eliminar</a></td>
                
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  }
