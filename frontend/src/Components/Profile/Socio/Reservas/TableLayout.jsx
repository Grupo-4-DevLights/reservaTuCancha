import React from "react";

export function TableLayout({ data, onDelete }) {
    return (
        <>  
            {console.log(data)}
            {data && data.length > 0 && (
                <table className="table-fixed w-full text-sm text-center mb-10">
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
                                <tr className="row text-lg bg-emerald-100 hover:bg-blue-300">
                                    {Object.values(row).map(
                                        (item, index) =>
                                        (
                                            <td className="break-words" key={index}>
                                                {item}
                                            </td>
                                        )
                                    )}
                                    <td>
                                        <button
                                            className="bg-red-500 rounded-md font-medium font-sans text-white p-1 mx-2 my-1"
                                            onClick={() => onDelete(row)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}