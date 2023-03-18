import React, { useEffect, useState } from "react";
import { deleteUser, modifyUser, obtenerSocios } from "../../../Services/Admin";
import { registerUser } from "../../../Services/Users";
import TableLayout from "../TableLayout";
import { FormEditUser } from "./FormEditUser";
import Swal from "sweetalert2";
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
  const [cargar, setCargar] = useState(false);

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
    setCreate(false);
    setModify(true);
    setUser(row);
  };

  const handleSaveUser = (values) => {
    modifyUser(values).then((data) => {
      setModify(!modify);
      setCargar(!cargar);
    });
    setUser(initialUser);
  };

  const handleDeleteUser = (value) => {
    Swal.fire({
      title: `Seguro que desea eliminar el usuario ${value.nombre}?`,
      text: "No podras revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(value).then((data) => {
          setCargar(!cargar);
          Swal.fire("Eliminado!", "El usuario ah sido eliminado.", "success");
        });
      }
    });
  };

  async function handleCreateUser(values) {
    const response = await registerUser(values);
    console.log("Usuario Creado", response);
    setCreate(false);
    setCargar(!cargar);
  }

  function ScrollButton() {
    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
      <button className="fixed-button" onClick={handleClick}>
        Volver arriba
      </button>
    );
  }

  const handleCancel = () => {
    if (modify) {
      setModify(false);
    }
    if (create) {
      setCreate(false);
    }
  };

  return (
    <>
      <ScrollButton />
      <div className="flex flex-col ">
        <div className="flex justify-center items-center text-center w-full mb-8">
          <h1 className="text-5xl font-bold">Lista de Usuarios</h1>
          <button
            className="ml-10 font-medium font-sans rounded-lg p-3 bg-gradient-to-tr from-emerald-500 to-blue-400 hover:to-emerald-700 text-white"
            onClick={() => {
              setCreate(true), setModify(false);
            }}
          >
            Agregar Usuario
          </button>
        </div>

        <TableLayout
          data={socios}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
        {modify && (
          <div className="fixed top-24 right-0 left-0 bottom-0 bg-black bg-opacity-70">
            <FormEditUser
              onSaveUser={handleSaveUser}
              user={user}
              title={"Modificar Usuario"}
              cancel={handleCancel}
            />
          </div>
        )}

        {create && (
          <div className="fixed top-24 right-0 left-0 bottom-0 bg-black bg-opacity-70">
            <FormEditUser
              onSaveUser={handleCreateUser}
              user={undefined}
              title={"Agregar Usuario"}
              cancel={handleCancel}
            />
          </div>
        )}
      </div>
    </>
  );
}
