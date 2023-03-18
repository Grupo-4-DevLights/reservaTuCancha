import React from "react";

export function TableLayout({ data, OnDelete }) {
  const attributesToShow = ["fecha", "hora_inicio", "hora_fin", "Cancha.nombre"];

  // Filtrar los atributos que deseas mostrar
  const filteredData = data.map((row) =>
    Object.keys(row)
      .filter((key) => attributesToShow.includes(key))
      .reduce((obj, key) => {
        obj[key] = row[key];
        return obj;
      }, {})
  );

  if (!data || data.length === 0) {
    return <p>Cargando reservas...</p>;
  }

  return (
    <>
      {data && data.length > 0 && (
        <table className="table-fixed w-full text-sm text-center mb-10">
          <thead>
            <tr className="text-xl">
              {attributesToShow.map((title, index) => (
                <th className="capitalize" key={`${title}_${index}`}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {filteredData.reverse().map((row, index) => {
              // Crear un nuevo objeto con los atributos que deseas pasar a OnDelete
              const onDeleteData = {
                id_usuario: data[data.length - index - 1].id_usuario,
                id_cancha: data[data.length - index - 1].id_cancha,
              };
              return (
                <React.Fragment key={index}>
                  <tr className="row text-lg bg-emerald-100 hover:bg-blue-300">
                    {Object.values(row).map((item, index) => (
                      <td className="break-words" key={index}>
                        {item}
                      </td>
                    ))}
                    <td>
                      <button
                        className="bg-red-500 rounded-md font-medium font-sans text-white p-1 mx-2 my-1"
                        onClick={() => OnDelete(onDeleteData.id_usuario,onDeleteData.id_cancha)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
