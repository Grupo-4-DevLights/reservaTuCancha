import React from "react";
import ButtonsAdmin from "./Admin/ButtonsAdmin";

export default function TableLayout({ data, onEditUser, onDeleteUser }) {
  return (
    <>
      {data && data.length > 0 && (
        <table className="table-fixed w-full text-sm text-center">
          <thead>
            <tr className="text-xl">
              {Object.keys(data[0]).map((title, index) => (
                <th className="capitalize" key={`${title}_${index}`}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <React.Fragment key={index}>
                {row.rol === "administrador" ? null : (
                  <tr className="row text-lg bg-emerald-100 hover:bg-gray-300">
                    {Object.values(row).map((item, index) => (
                      <td className="break-words  " key={index}>{item}</td>
                    ))}
                    <td>
                      <button
                        className="bg-emerald-500 rounded-md font-medium font-sans text-white p-1 mx-2 my-1"
                        onClick={() => onEditUser(row)}
                      >
                        Modificar
                      </button>
                      </td>
                      <td>
                      <button
                        className="bg-red-500 rounded-md font-medium font-sans text-white p-1 mx-2 my-1"
                        onClick={() => onDeleteUser(row)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
      
    </>
  );
}
