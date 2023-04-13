import React, { useState,useEffect } from "react";
import { NavBar } from "../../../NavBar";
import { LayoutProfile } from "../../LayoutProfile";
import { listarEmpresaPropietario } from '../../../../Services/Propietario'
import {registerCancha} from '../../../../Services/Canchas'
import { useAppContext } from '../../../../context/userContext'

export const CrearCancha = () => {

    const { user } = useAppContext()

    const [empresa, Setempresa] = useState({})

    const [error, SetError] = useState('')
    const [exito, SetExito]= useState('')
    const [loading, setLoading] = useState(false)


    const [registro, setRegistro] = useState({
        nombre: "",
        precio: "",
        tipo: "",
        id_empresa:""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRegistro((prevRegistro) => ({
            ...prevRegistro,
            [name]: value
        }));
    };

    const buscarIdEmpresa=() => {
        if (user) {
            setLoading(true)
            listarEmpresaPropietario(user.id_usuario)
                .then(data => Setempresa(data))
                .catch(error => SetError(error.message))
                .finally(() => setLoading(false))
        }

    }

    useEffect(() => {
        buscarIdEmpresa()
        
    }, []);




    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!(registro.nombre && registro.precio && registro.tipo)) {
            SetError('Por favor complete todos los campos')
        } else {
            registro.id_empresa=empresa.id_empresa
            await registerCancha(registro)
                .then(() => SetExito('¡Cancha creada con éxito!'))
                .catch(error => SetError(error.message));
            SetError('')
            setRegistro({ nombre: "", precio: "", tipo: "" });
        }

    };

    return (
        <>
            <NavBar />
            <LayoutProfile>
                <div className="flex flex-col items-center justify-center ">
                    <h1 className="text-4xl font-bold mb-8">Crear cancha</h1>

                    <div className="flex items-center justify-center">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-green-300 rounded-lg shadow-lg p-8 w-80 flex flex-col gap-4"
                        >
                            {error && <span className=" text-red-600">{error}</span>}

                            {!error ? exito && <span className=" text-green-600">{exito}</span> : null}
                            <div className="flex flex-col">
                                <label htmlFor="nombre" className="text-lg font-medium mb-1">
                                    Nombre:
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={registro.nombre}
                                    onChange={handleInputChange}
                                    className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent px-4 py-2"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="precio" className="text-lg font-medium mb-1">
                                    Precio:
                                </label>
                                <input
                                    type="number"
                                    id="precio"
                                    name="precio"
                                    value={registro.precio}
                                    onChange={handleInputChange}
                                    className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent px-4 py-2"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="tipo" className="text-lg font-medium mb-1">
                                    Tipo:
                                </label>
                                <select
                                    id="tipo"
                                    name="tipo"
                                    value={registro.tipo}
                                    onChange={handleInputChange}
                                    className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent px-4 py-2"
                                >
                                    <option value="">Seleccione un tipo</option>
                                    <option value="futbol">Fútbol</option>
                                    <option value="tennis">Tenis</option>
                                    <option value="basquetbol">Básquetbol</option>
                                    <option value="voley">Vóley</option>
                                    <option value="padel">Pádel</option>
                                    <option value="hockey">Hockey</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                            >
                                Crear registro
                            </button>
                        </form>
                    </div>
                </div>
            </LayoutProfile>
        </>
    );
};
