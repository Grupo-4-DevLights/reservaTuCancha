import React, { useEffect, useState } from "react";
import { decodificar, useAppContext } from "../../context/userContext";
import { modifyUser, obtenerSociosConId } from "../../Services/Admin";
import { ButtonShowPassword } from "../../Utils/Butttons";

export function DatosPersonales() {
  const { user, setUser } = useAppContext();
  const [enable, setEnable] = useState("disable");
  const [formValues, setFormValues] = useState({
    nombre: user?.nombre || "",
    email: user?.email || "",
    rol: user?.rol || "",
    password: user?.password || "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function DisabledButton() {
    setEnable(!enable);
  }

  async function EnviarDatos(e) {
    e.preventDefault();
    modifyUser(formValues).then((data) => {
      console.log("Usuario Modificado", data);
    });
    setUser(formValues);
    setEnable(!enable);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="flex flex-col text-center">
        <h3 className="text-4xl mb-6 font-sans font-medium">
          Datos Personales
        </h3>
        <form onSubmit={EnviarDatos}>
          <div className="flex gap-2 flex-col items-start">



            <p className="text-xl font-sans font-medium border-b-2 border-emerald-400">
              Nombre
            </p>
            <input
              disabled={enable}
              type="text"
              name="nombre"
              value={formValues?.nombre}
              onChange={handleChange}
              className={`rounded-lg flex w-full ${
                !enable && "bg-emerald-300"
              }`}
            />

            <p className="text-xl font-sans font-medium border-b-2 border-emerald-400">
              Email
            </p>
            <input
              disabled={enable}
              type="text"
              name="email"
              value={formValues?.email}
              onChange={handleChange}
              className={`rounded-lg flex w-full ${
                !enable && "bg-emerald-300"
              }`}
            />

            <p className="text-xl font-sans font-medium border-b-2 border-emerald-400">
              Contraseña
            </p>
            <div className="relative w-full">
              <input
                disabled={enable}
                type={showPassword ? "text" : "password"}
                name="password"
                value={formValues?.password}
                onChange={handleChange}
                className={`rounded-lg flex w-full ${
                  !enable && "bg-emerald-300"
                } pr-10`} // Aquí se agrega `pr-10` para darle espacio al botón
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-2 text-gray-600 focus:outline-none" // Aquí se usa las clases de TailwindCSS para posicionar el botón
              >
                {showPassword ? (
                  <ButtonShowPassword showPassword={showPassword} />
                ) : (
                  <ButtonShowPassword showPassword={showPassword} />
                )}
              </button>
            </div>
            

            <p className="text-xl font-sans font-medium border-b-2 border-emerald-400">
              Categoria
            </p>
            <input
              disabled={enable}
              type="text"
              name="rol"
              value={formValues?.rol}
              onChange={handleChange}
              className={`rounded-lg flex w-full ${
                !enable && "bg-emerald-300"
              }`}
            />
          </div>
          {enable && (
            <button
              className="bg-gray-500 hover:bg-gray-400 py-2 px-4 rounded-xl my-8 font-sans font-medium text-white"
              onClick={DisabledButton}
            >
              Modificar Datos
            </button>
          )}
          {!enable && (
            <button
              className="bg-emerald-500 hover:bg-emerald-400 py-2 px-4 rounded-xl my-8 font-sans font-medium text-white"
              type="submit"
            >
              Enviar Modificaciones
            </button>
          )}
        </form>
      </div>
    </>
  );
}
