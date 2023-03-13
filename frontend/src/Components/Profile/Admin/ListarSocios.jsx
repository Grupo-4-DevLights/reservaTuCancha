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
  const [cargar, setCargar] = useState(false)

  useEffect(() => {
    obtenerSocios()
      .then((data) => {
        setSocios(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cargar]);

  const handleEditUser = (row) => {
    setModify(true);
    setUser(row);
  };

  const handleSaveUser = (values) => {
    modifyUser(values).then((data) => {
      console.log("Usuario Modificado", data);
      setModify(!modify);
      setCargar(!cargar)
    });
    setUser(initialUser);
  };

  const handleDeleteUser = (value) => {
    deleteUser(value).then((data) => {
        console.log("Usuario Eliminado", data);
        setCargar(!cargar)
    })
  };

  async function handleCreateUser(values) {
    const response = await registerUser(values)
    console.log("Usuario Creado", response);
    setCreate(false);
    setCargar(!cargar)
    }

    const handleCancel = () => {
        if(modify){
            setModify(false)
        }
        if(create){
            setCreate(false)
        }
    }

  return (
    <>
      <div className="flex flex-col ">
        <div className="flex relative justify-center items-center text-center  w-full mb-4">
          <h1 className="text-3xl font-bold">Listar Usuarios</h1>
          <button className="absolute top-0 right-16 text-white  bg-emerald-500 hover:bg-emerald-400 p-2 rounded-md" onClick={()=>{setCreate(true)}}>Agregar Usuario</button>
        </div>
        
        <TableLayout
          data={socios}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
        {modify && (
            create ? (()=>{setCreate(false)}) : (
          <>
            <div className="flex">
              <FormEditUser onSaveUser={handleSaveUser} user={user} title={"Modificar Usuario"} cancel={handleCancel} />
            </div>
          </>
        ))}
        {create && !modify &&(
            <div className="flex">
            <FormEditUser onSaveUser={handleCreateUser} user={undefined} title={"Crear Usuario"} cancel={handleCancel}/>
          </div>
        )}
      </div>
    </>
  );
}
