import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";



import { NavBar } from "../../../NavBar";
import { LayoutProfile } from "../../LayoutProfile";
import {TableLayout} from "./TableLayout"
import { useAppContext } from "../../../../context/userContext";
import { ObtenerReservas,eliminarReservas } from "../../../../Services/Socio";





export function IndexReserva() {

  const { user } = useAppContext();


  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);

  


  useEffect(() => {
    const cargarReservas = async () => {
      if (user) { // verificar que user tenga un valor
        setLoading(true);
        await ObtenerReservas(user.id_usuario)
          .then((data) => {
            setReservas(data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }
    };
    cargarReservas();
  },[]);


   const handleDelete=(id_usuario,id_cancha)=>{
    Swal.fire({
      title: `Seguro que desea eliminar la reserva seleccionada?`,
      text: "No podras revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarReservas(id_usuario,id_cancha).then(() => {
          Swal.fire("Eliminado!", "El usuario ah sido eliminado.", "success");
        });
      }
    })
}

  


  
  return (
    <>
      <NavBar />
      <LayoutProfile>
        <div className="flex flex-col ">
          <div className="flex justify-center items-center text-center w-full mb-8">
            <h1 className="text-5xl font-bold">Sus reservas realizadas</h1>
          </div>
  
        <TableLayout
          data={reservas}
          OnDelete={handleDelete}
        />

        </div>
      </LayoutProfile>
    </>
  );
}
