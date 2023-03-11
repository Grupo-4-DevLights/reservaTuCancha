import React, { useEffect, useState } from "react";
import {
  modifyUsuer,
  obtenerSocios,
  obtenerSociosConId,
} from "../../../Services/Admin";
import TableLayout from "../TableLayout";
import { FormEditUser } from "./FormEditUser";

const initialUser = {
  id: "",
  nombre: "",
  email: "",
  rol: "",
};

export function ListarSocios() {
  const [socios, setSocios] = useState([]);
  const [user, setUser] = useState(initialUser);
  const [modify, setModify] = useState(false);


  useEffect(() => {
    obtenerSocios()
      .then((data) => {
        setSocios(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [modify]);

  const handleEditUser = (row) => {
    setModify(true)
    setUser(row);
  };

  const handleSaveUser = (values) => {
    modifyUsuer(values).then((data) => {
      console.log("Usuario Modificado", data);
      setModify(!modify);
    });
    setUser(initialUser);
  };

  const handleDeleteUser = (value) => {
    console.log(value);
  };

  return (
    <>
      <div className="flex flex-col ">
        <div className="flex justify-center  text-center text-3xl font-bold w-full mb-8">
          <h1>Listar Usuarios</h1>
        </div>
        <div className="flex">
          <TableLayout
            data={socios}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        </div>

        {modify && (
          <>
            <div className="flex justify-center mt-8 text-center text-3xl font-bold w-full mb-8">
              <h1>Modificar Usuario</h1>
            </div>
            <div className="flex">
              <FormEditUser onSaveUser={handleSaveUser} user={user} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
