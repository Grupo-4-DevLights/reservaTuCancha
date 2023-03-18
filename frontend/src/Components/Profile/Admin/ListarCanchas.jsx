import React, { useEffect, useState } from 'react'
import { deleteCancha, listarCanchas, modifyCancha, registerCancha } from '../../../Services/Canchas';
import TableLayout from '../TableLayout';
import { FormEditCancha } from './FormEditCancha';
import { ScrollButton } from './ListarEmpresas';
import Swal from "sweetalert2";

const initialCancha = {
    id: "",
    nombre: "",
    tipo: "",
    precio: "",
    id_empresa: ""
  };
export default function ListarCanchas() {
    const [canchas, setCanchas] = useState();
    const [cargar, setCargar] = useState(false);
    const [modify, setModify] = useState(false);
    const [create, setCreate] = useState(false);


    useEffect(()=>{
        listarCanchas().then(
            (data) => setCanchas(data)
        ).catch(
            (error) => console.log(error)
        )
    },[cargar])

    const handleEditCancha = (row) => {
        setCreate(false);
        setModify(true);
        setCancha(row);
      };
    
      const handleSaveCancha = (values) => {
        modifyCancha(values).then((data) => {
          setModify(!modify);
          setCargar(!cargar);
        });
        setCancha(initialCancha);
      };
    
      const handleDeleteCancha = (value) => {
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
            deleteCancha(value).then((data) => {
              setCargar(!cargar);
              Swal.fire("Eliminada!", "La empresa ah sido eliminada.", "success");
            });
          }
        });
      };

    const handleCancel = () => {
        if (modify) {
          setModify(false);
        }
        if (create) {
          setCreate(false);
        }
    };

    async function handleCreateCancha(values) {
        const response = await registerCancha(values);
        console.log("Cancha Creada", response);
        setCreate(false);
        setCargar(!cargar);
      }

  return (
    <>
        <ScrollButton />
        <div className="flex flex-col ">
            <div className="flex justify-center items-center text-center w-full mb-8">
                <h1 className="text-5xl font-bold">Lista de Canchas</h1>
                <button
                    className="ml-10 font-medium font-sans rounded-lg p-3 bg-gradient-to-tr from-emerald-500 to-blue-400 hover:to-emerald-700 text-white"
                    onClick={() => {
                    setCreate(true);
                    }}
                >Agregar Cancha</button>
            </div>
         </div>
        <TableLayout
          data={canchas}
          onDelete={handleDeleteCancha}
          onEdit={handleEditCancha}
          layout={"Cancha"}
        />
        {modify && (
          <div className="fixed top-24 right-0 left-0 bottom-0 bg-black bg-opacity-70">
            <FormEditCancha
              onSave={handleSaveCancha}
              empresa={canchas}
              title={"Modificar Cancha"}
              cancel={handleCancel}
            />
          </div>
        )}
        {create && (
          <div className="fixed top-24 right-0 left-0 bottom-0 bg-black bg-opacity-70">
            <FormEditCancha
              onSave={handleCreateCancha}
              empresa={undefined}
              title={"Agregar Cancha"}
              cancel={handleCancel}
            />
          </div>
        )}
    
    </>
    
  )
}
