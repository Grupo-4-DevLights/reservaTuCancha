import React from "react";
import { useAppContext } from "../../context/userContext";
import ButtonsAdmin from "./Admin/ButtonsAdmin";
import { NavBarUser } from "./NavBarUser";
import { ButtonsEmpresa } from "./Empresa/ButtonsEmpresa";
import ButtonsSocio from "./Socio/ButtonsSocio";
export function LayoutProfile({ children }) {
  const { user } = useAppContext();
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-center bg-emerald-500 mb-5">
        <div className="flex justify-center">
          {user &&
            (user.rol === "socio" ? (
              <NavBarUser>
                <ButtonsSocio />
              </NavBarUser>
            ) : user.rol === "administrador" ? (
              <NavBarUser>
                <ButtonsAdmin />
              </NavBarUser>
            ) : (
              <NavBarUser>
                <ButtonsEmpresa />
              </NavBarUser>
            ))}
        </div>
      </div>
      <div className="w-full flex justify-center content-start mt-4">
        {children}
      </div>
    </div>
  );
}
