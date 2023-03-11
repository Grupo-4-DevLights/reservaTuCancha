import React from "react";
import ButtonsAdmin from "./Admin/ButtonsAdmin";

export default function TableLayout({ data, onEditUser, onDeleteUser }) {
  return (
    <>
      {data && data.length > 0 && (
        <table className="border-collapse table-fixed w-full text-sm text-center">
          <thead>
            <tr className="text-xl">
              {Object.keys(data[0]).map((title, index) => (
                <th key={`${title}_${index}`}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <React.Fragment key={index}>
                {row.rol === "administrador" ? null : (
                  <tr className="text-lg">
                    {Object.values(row).map((item, index) => (
                      <td key={index}>{item}</td>
                    ))}
                    <td>
                      <button
                        className="bg-red-500"
                        onClick={() => onEditUser(row)}
                      >
                        Modificar
                      </button>
                      <a
                        className="bg-red-500 mx-2"
                        onClick={() => onDeleteUser(row)}
                      >
                        Eliminar
                      </a>
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
