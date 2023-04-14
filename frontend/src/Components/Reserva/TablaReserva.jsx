import React, { useEffect, useState } from 'react'
import { obtenerReservas } from '../../Services/Reserva';
import {  ReservarCancha, obtenerEmpresas } from '../../Services/Socio';
import { obtenerCanchass } from '../../Services/Canchas';
import Swal from "sweetalert2";
import { useAppContext } from '../../context/userContext';
import { fetchMercadoPago } from '../../Services/mercadopago';

export  function TablaReserva() {
    const { user } = useAppContext();
    const [reservas, setReservas] = useState([]);
    const [reservasFiltradas, setReservasFiltradas] = useState([]);
    const [estadoFiltro, setEstadoFiltro] = useState("");
    const [fechaFiltro, setFechaFiltro] = useState("");
    const [horarioFiltro, setHorarioFiltro] = useState("");
    const [empresaFiltro, setEmpresaFiltro] = useState("");
    const [canchasFiltro, setCanchasFiltro] = useState("");
    const [canchasEmpresa, setCanchasEmpresa] = useState([]);
    const [canchas, setCanchas] = useState();
    const [empresa, setEmpresa] = useState();
    const [horarios, setHorarios] = useState();
    const [cargar, setCargar] = useState(false);

    const cargarDatos = async () => {
        obtenerReservas()
        .then(data => {
            setReservas(data);
            setCargar(true);
        })
        obtenerEmpresas()
        .then(data => {setEmpresa(data)})
        obtenerCanchass()
        .then(data => {setCanchas(data)})
        setHorarios(["14:00-15:00", '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00']);
    }

    useEffect(() => {
        cargarDatos();
    },[cargar])


    useEffect(() => {
        if (cargar) {
            let reservasFiltradasTemp = reservas; // crear una copia temporal del estado de las reservas
            reservasFiltradasTemp = reservasFiltradasTemp.filter(reserva => reserva.estado === "disponible");
            if (fechaFiltro !== "") {
                reservasFiltradasTemp = reservasFiltradasTemp.filter(reserva => reserva.fecha === fechaFiltro);
            }
            if (empresaFiltro !== "") {
                reservasFiltradasTemp = reservasFiltradasTemp.filter(reserva => reserva['Cancha.id_empresa'] == empresaFiltro);
            }
            if(canchasFiltro !== ""){
                reservasFiltradasTemp = reservasFiltradasTemp.filter(reserva => reserva.id_cancha == canchasFiltro);
            }
            if(horarioFiltro !== ""){
                reservasFiltradasTemp = reservasFiltradasTemp.filter(reserva => reserva.horario == horarioFiltro);
            }
            if(fechaFiltro !==""){
                reservasFiltradasTemp = reservasFiltradasTemp.filter(reserva => reserva.fecha == fechaFiltro);
            }
            
            setReservasFiltradas(reservasFiltradasTemp); // actualizar el estado con las reservas filtradas
        }
    }, [estadoFiltro, fechaFiltro, canchasFiltro, reservas, cargar, empresaFiltro,horarioFiltro]);
    

    const handleEmpresaChange = (e) => {
        setCanchasFiltro('');
        setEmpresaFiltro(e);
        const canchasEmpresas = canchas.filter((cancha) => cancha.id_empresa == e);
        setCanchasEmpresa(canchasEmpresas);
    };
    

    const obtenerNombreCancha = (id) => {
        if (Array.isArray(canchas)) {
          const currentCancha = canchas?.find(cancha => cancha.id_cancha === id);
          if (currentCancha) {
            const empresaCancha = empresa?.find(empresa => empresa.id_empresa === currentCancha.id_empresa);
            if (empresaCancha) {
              return empresaCancha.nombre + " - " + currentCancha.nombre;
            }
          } 
        }
      };

    async function handleReserva (reservaHandler){
        if (user) {
            
          const reservaData = {
            id_cancha: parseInt(reservaHandler.id_cancha),
            id_usuario: user.id_usuario,
            fecha: reservaHandler.fecha,
            horario: reservaHandler.horario
            }
            console.log("Esta es una reserva",reservaData)
            Swal.fire({
                title: `Seguro que quieres reservar?`,
                html: "Vas a reservar la cancha <br><b>" + obtenerNombreCancha(reservaHandler.id_cancha) + "</b><br> <b>" + reservaHandler.fecha + "</b><br> <b>" + reservaHandler.horario + "<b>",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, RESERVAR",
                cancelButtonText: "Cancelar",
            }).then(async (result)=>{
                if (result.isConfirmed) {
                    await ReservarCancha(reservaData)
                    .then(async()=>{
                        cargarDatos()
                        await fetchMercadoPago()
                        Swal.fire("Reservada!", "Te informaremos por mail la confirmacion de la Reserva", "success");
                    })
                    .catch((error)=>{
                        Swal.fire("Error!", "No se pudo realizar la reserva", "error");
                    })
                }
            })
            
          }
          
    }

  return (
    <>
        
        <div className="flex justify-center w-100">
            <div className="flex flex-col w-3/4 text-center">
                <h1 className="text-4xl mb-6 font-sans font-medium">Reservas</h1>
            </div>
        </div>
        <div className="flex flex-col w-100">
            <div className="flex justify-left w-1/2 mx-auto">
                <div className="flex">
                    <h1 className="text-2xl my-3 font-sans font-medium">Selecciona los parametros</h1>
                </div>
            </div>
            <div className="flex justify-left w-1/2 mx-auto">
                <div className="grid gap-4 grid-cols-4">
                    <div className="flex flex-col">
                        <label htmlFor="estadoFiltro">Empresa:</label>
                        <select id="estadoFiltro" className='border border-slate-800 rounded-xl px-2 py-1 text-sm'  onChange={(e)=>{handleEmpresaChange(e.target.value)}} value={empresaFiltro}>
                            <option value="">Todos</option>
                            {empresa?.map(cancha => (
                                <option value={cancha.id_empresa}>{cancha.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="canchaFiltro">Cancha:</label>
                        <select id="canchaFiltro" className='border border-slate-800 rounded-xl px-2 py-1 text-sm'  onChange={(e) => setCanchasFiltro(e.target.value)} value={canchasFiltro}>
                            <option value="">Todos</option>
                            {canchasEmpresa.map((cancha) => (
                            <option value={cancha.id_cancha} key={cancha.id_cancha}>
                                {cancha.nombre}
                            </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="estadoFiltro">Horario:</label>
                        <select id="horarioFiltro" className='border border-slate-800 rounded-xl px-2 py-1 text-sm'  onChange={(e)=>{setHorarioFiltro(e.target.value)}} value={horarioFiltro}>
                            <option value="">Todos</option>
                            {horarios?.map(horario => (
                                <option value={horario}>{horario}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="estadoFiltro">Fecha:</label>
                        <input type="date" className='border border-slate-800 rounded-xl px-2 py-1 bg-white text-sm'  value={fechaFiltro} onChange={(e) => setFechaFiltro(e.target.value)} />
                    </div>
                </div>
            </div>
                
        </div>
        <div className='w-100 flex justify-center'>
            <table id="tablaReserva" className="table-fixed text-sm text-center mt-5 mb-5 border rounded-xl w-3/4">
            <thead>
                <tr className='text-xl'>
                    <td className="capitalize">Cancha</td>
                    <td className="capitalize">Horario</td>
                    <td className="capitalize">Fecha</td>
                    <td className="capitalize">Estado</td>
                </tr>
            </thead>
            <tbody>
                {reservasFiltradas.length === 0 && (
                    <tr className="row text-lg bg-emerald-100 hover:bg-blue-300">
                        <td colSpan="4">No se encontraron Canchas disponibles con esos parametros</td>
                    </tr>
                )}
                 {reservasFiltradas?.map(reserva => (
                <tr  className="row text-lg bg-emerald-100 hover:bg-blue-300">
                    <td className="break-words">{obtenerNombreCancha(reserva.id_cancha)}</td>
                    <td className="break-words">{reserva.horario}</td>
                    <td className="break-words">{reserva.fecha} </td>
                    <td className="break-words"><button className='font-medium font-sans my-1 border-b-2 border-blue-700' onClick={() => handleReserva(reserva)}>Reservar</button> </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        
    </>
  )
}
