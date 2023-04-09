import React from "react";

export default function TablaRevervas({ data,}) {
  return (
    <>
      {data && data.length > 0 && (
        <table className="table-fixed w-full text-sm text-center mt-5 mb-5">
          <thead>
            <tr className="text-xl">
              {Object.keys(data[0]).map((title, index) =>
                  <th className="capitalize" key={`${title}_${index}`}>
                    {title}
                  </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.reverse().map((row, index) => (
              <React.Fragment key={index}>
                {row.rol === "administrador" ? null : (
                  <tr className="row text-lg bg-emerald-100 hover:bg-blue-300">
                    {Object.values(row).map(

                      (item, index) =>
                        (
                          <td className="break-words" key={index}>
                            {item}
                          </td>
                        )
                    )}
                   
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
