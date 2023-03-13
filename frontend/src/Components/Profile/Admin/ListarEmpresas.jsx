import React, { useEffect, useState } from "react";
import { deleteEmpresa, modifyEmpresa, obtenerEmpresas } from "../../../Services/Admin";
import { registerEmpresa } from "../../../Services/Empresa";
import TableLayout from "../TableLayout";
import { FormEditEmpresa } from "./FormEditEmpresa";
import Swal from "sweetalert2";
const initialEmpresa = {
  id: "",
  nombre: "",
  direccion: "",
  telefono: "",
};

export function ListarEmpresas() {
  const [empresas, setEmpresas] = useState([]);
  const [empresa, setEmpresa] = useState(initialEmpresa);
  const [modify, setModify] = useState(false);
  const [create, setCreate] = useState(false);
  const [cargar, setCargar] = useState(false);

  useEffect(() => {
    obtenerEmpresas()
      .then((data) => {
        setEmpresas(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cargar]);

  const handleEditEmpresa = (row) => {
    setCreate(false)
    setModify(true);
    setEmpresa(row);
  };

  const handleSaveEmpresa = (values) => {
    modifyEmpresa(values).then((data) => {
      setModify(!modify);
      setCargar(!cargar);
    });
    setEmpresa(initialEmpresa);
  };

  const handleDeleteEmpresa = (value) => {
    Swal.fire({
      title: `Seguro que desea eliminar la empresa ${value.nombre}?`,
      text: "No podras revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmpresa(value).then((data) => {
          setCargar(!cargar);
          Swal.fire("Eliminada!", "La empresa ah sido eliminada.", "success");
        });
      }
    });
  };

  async function handleCreateEmpresa(values) {
    const response = await registerEmpresa(values);
    console.log("Empresa Creada", response);
    setCreate(false);
    setCargar(!cargar);
  }

  function ScrollButton() {
    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <h1 className="text-5xl font-bold">Lista de Empresas</h1>
          <button
            className="ml-10 font-medium font-sans rounded-lg p-3 bg-gradient-to-tr from-blue-400 to-blue-600 hover:to-blue-700 text-white"
            onClick={() => {
              setCreate(true), setModify(false);
            }}
          >
            Agregar Empresa
          </button>
        </div>

        <TableLayout
          data={empresas}
          onEdit={handleEditEmpresa}
          onDelete={handleDeleteEmpresa}
        />
        {modify &&
          (create ? (
            () => {
              setCreate(false);
            }
          ) : (
            <div className="fixed top-24 right-0 left-0 bottom-0">
              <FormEditEmpresa
                onSave={handleSaveEmpresa}
                empresa={empresa}
                title={"Modificar Empresa"}
                cancel={handleCancel}
              />
            </div>
          ))}

        {create &&
          (modify ? (
            () => {
              setModify(false);
            }
          ) : (
            <div className="fixed top-24 right-0 left-0 bottom-0">
              <FormEditEmpresa
                onSave={handleCreateEmpresa}
                empresa={undefined}
                title={"Agregar Empresa"}
                cancel={handleCancel}
              />
            </div>
          ))}
      </div>
    </>
  );
}
