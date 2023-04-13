import React, { useEffect, useState } from 'react'
import { obtenerReservas } from '../../Services/Reserva';
import {  obtenerEmpresas } from '../../Services/Socio';
import { obtenerCanchass } from '../../Services/Canchas';

export  function TablaReserva() {
    const [reservas, setReservas] = useState([]);
    const [reservasFiltradas, setReservasFiltradas] = useState([]);
    const [estadoFiltro, setEstadoFiltro] = useState("disponible");
    const [fechaFiltro, setFechaFiltro] = useState("");
    const [empresaFiltro, setEmpresaFiltro] = useState("");
    const [canchasFiltro, setCanchasFiltro] = useState([]);
    const [canchas, setCanchas] = useState();
    const [empresa, setEmpresa] = useState();

    useEffect(() => {
        obtenerReservas()
        .then(data => {
            setReservas(data)
        })
        .catch(err => console.log(err))
        obtenerEmpresas()
        .then(data => {setEmpresa(data)})
        .catch(err => console.log(err))
        obtenerCanchass()
        .then(data => {setCanchas(data)})
        .catch(err => console.log(err))
    },[])


    useEffect(() => {
        let reservasFiltradasTemp = reservas.filter(reserva => {
            if (estadoFiltro && reserva.estado !== "disponible") {
                return false;
            }
            if (fechaFiltro && reserva.fecha !== fechaFiltro) {
                return false;
            }
            if (canchasFiltro && reserva.id_cancha !== canchasFiltro) {
                return false;
            }
            return true;
        });
        setReservasFiltradas(reservasFiltradasTemp);
    }, [estadoFiltro, fechaFiltro, canchasFiltro, reservas]);
    

    const handleEmpresaChange = (e) => {
        const empresaId = e.target.value;
        setEmpresaFiltro(empresaId);
        const canchasEmpresa = canchas.filter((cancha) => cancha.id_empresa == empresaId);
        setCanchasFiltro(canchasEmpresa);
    };
    

    const obtenerNombreCancha = (id) => {
        if (Array.isArray(canchas)) {
          const currentCancha = canchas?.find(cancha => cancha.id_cancha === id);
          if (currentCancha) {
            const empresaCancha = empresa?.find(empresa => empresa.id_empresa === currentCancha.id_empresa);
            if (empresaCancha) {
              return empresaCancha.nombre + " - " + currentCancha.nombre;
            } else {
              return "Empresa no encontrada";
            }
          } else {
            return "Cancha no encontrada";
          }
        } else {
          return "No se encontraron canchas";
        }
      };

  return (
    <>
        <h2>Tabla</h2>
        <div>Parametros</div>
        <div>
        <label htmlFor="estadoFiltro">Cancha:</label>
            <select id="estadoFiltro"  onChange={handleEmpresaChange} value={empresaFiltro}>
                <option value="">Todos</option>
                {empresa?.map(cancha => (
                    <option value={cancha.id_empresa}>{cancha.nombre}</option>
                ))}
            </select>
            {canchasFiltro.length > 0 && (
                <>
                <label htmlFor="canchaFiltro">Cancha:</label>
                <select id="canchaFiltro">
                    {canchasFiltro.map((cancha) => (
                    <option value={cancha.id_cancha} key={cancha.id_cancha}>
                        {cancha.nombre}
                    </option>
                    ))}
                </select>
                </>
            )}
        </div>
        <>
            <table className="table-fixed w-full text-sm text-center mt-5 mb-5">
            <thead>
                <tr className='text-xl'>
                    <td className="capitalize">Cancha</td>
                    <td className="capitalize">Horario</td>
                    <td className="capitalize">Dia</td>
                    <td className="capitalize">Fecha</td>
                    <td className="capitalize">Estado</td>
                </tr>
            </thead>
            <tbody>
                 {reservasFiltradas?.map(reserva => (
                <tr  className="row text-lg bg-emerald-100 hover:bg-blue-300">
                    <td className="break-words">{obtenerNombreCancha(reserva.id_cancha)}</td>
                    <td className="break-words">{reserva.horario}</td>
                    <td className="break-words">ALGUN DIA </td>
                    <td className="break-words">{reserva.fecha} </td>
                    <td className="break-words">{reserva.estado} </td>
                </tr>
                ))}
            </tbody>
            </table>
        </>
        
    </>
  )
}
