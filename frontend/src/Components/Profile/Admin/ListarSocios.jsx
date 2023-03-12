import React, { useEffect, useState } from "react";
import {
    deleteUser,
    modifyUser,
  obtenerSocios
} from "../../../Services/Admin";
import { registerUser } from "../../../Services/Users";
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
  const [create, setCreate] = useState(false);

  useEffect(() => {
    obtenerSocios()
      .then((data) => {
        setSocios(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [modify, create]);

  const handleEditUser = (row) => {
    setModify(true);
    setUser(row);
  };

  const handleSaveUser = (values) => {
    modifyUser(values).then((data) => {
      console.log("Usuario Modificado", data);
      setModify(!modify);
    });
    setUser(initialUser);
  };

  const handleDeleteUser = (value) => {
    deleteUser(value).then((data) => {
        console.log("Usuario Eliminado", data);
    })
  };

  async function handleCreateUser(values) {
    const response = await registerUser(values)
    console.log("Usuario Creado", response);
    setCreate(!create);
    }

  return (
    <>
      <div className="flex flex-col ">
        <div className="flex relative justify-center items-center text-center  w-full mb-4">
          <h1 className="text-3xl font-bold">Listar Usuarios</h1>
          <button className="absolute top-0 right-16  bg-emerald-500 hover:bg-emerald-400 p-2 rounded-md" onClick={()=>{setCreate(!create)}}>Agregar Usuario</button>
        </div>
        
        <TableLayout
          data={socios}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
        {modify && (
          <>
            <div className="flex">
              <FormEditUser onSaveUser={handleSaveUser} user={user} title={"Modificar Usuario"} />
            </div>
          </>
        )}
        {create && (
            <div className="flex">
            <FormEditUser onSaveUser={handleCreateUser} user={undefined} title={"Crear Usuario"} />
          </div>
        )}
      </div>
    </>
  );
}
