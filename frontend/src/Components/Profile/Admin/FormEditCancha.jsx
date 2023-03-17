import React, { useEffect, useState } from "react";
import { obtenerEmpresas, obtenerSocios } from "../../../Services/Admin";

// todo q pueda cambiar la imagen tmb

export function FormEditCancha({ cancha, onSave, title, cancel }) {
  const [formValues, setFormValues] = useState({
    nombre: cancha?.nombre || "",
    tipo: cancha?.tipo || "",
    id_empresa: cancha?.id_empresa || "",
    precio: cancha?.precio || ""
  });
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    obtenerEmpresas()
      .then((data) => {
        console.log("Entre a obtener empresa")
        setEmpresas(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setFormValues(cancha);
  }, [cancha]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues)
    onSave(formValues);
  };

  return (
    <div className="flex w-screen h-screen flex-col items-center mt-8">
      <form
        onSubmit={handleSubmit}
        className="mt-5 p-4 flex-wrap mx-auto bg-white shadow-2xl border-4 rounded-lg min-w-[300px] w-1/3"
      >
        <h3 className="text-3xl font-bold text-center w-full mb-6">{title}</h3>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-800" id="nombre">
            Nombre
          </label>
          <input
            autoFocus
            type="text"
            name="nombre"
            value={formValues?.nombre || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-800" id="direccion">
            Tipo
          </label>
          <input
            type="text"
            name="tipo"
            value={formValues?.tipo || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-800" id="telefono">
            Precio
          </label>
          <input
            type="number"
            name="precio"
            value={formValues?.precio || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-800" id="id_empresa">
            Id Empresa 
          </label>
          <select value={formValues?.id_empresa || ""} name="id_empresa" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500">
            <option value="">Seleccione una empresa</option>
              {empresas?.map((empresa) => (
                <option value={empresa.id_empresa}>{empresa.nombre}</option>
              ))}
          </select>
        </div>
        <div>
          <button
            className="font-bold mt-5 w-full rounded-lg px-6 py-3 bg-gradient-to-tr from-emerald-500 to-emerald-700 hover:to-green-500 text-white"
            type="submit"
          >
            Guardar Cambios
          </button>
          <button
            className="font-bold mt-5 w-full rounded-lg px-6 py-3 bg-gradient-to-tr from-gray-500 to-gray-700 hover:to-gray-500 text-white"
            onClick={() => cancel()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
