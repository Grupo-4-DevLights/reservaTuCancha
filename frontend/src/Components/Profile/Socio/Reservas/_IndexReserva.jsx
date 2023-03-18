import React, { useState, useEffect } from "react";
import { NavBar } from "../../../NavBar";
import { LayoutProfile } from "../../LayoutProfile";
import {TableLayout} from "./TableLayout"


import { useAppContext } from "../../../../context/userContext";


import { ObtenerReservas } from "../../../../Services/Socio";





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


  
  return (
    <>
      <NavBar />
      <LayoutProfile>
        {(loading ? <h1 className=" text-center">Cargando...</h1> : null )}
        <div className="flex flex-col ">
          {console.log(reservas)}
          <div className="flex justify-center items-center text-center w-full mb-8">
            <h1 className="text-5xl font-bold">Sus reservas realizadas</h1>
          </div>
  
        <TableLayout
          data={reservas}
          //onDelete={handleDeleteUser}
        />

        </div>
      </LayoutProfile>
    </>
  );
}
