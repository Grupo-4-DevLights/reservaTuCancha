import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { obtenerCanchas } from "../../Services/Socio";
import { NavBar } from "../NavBar";

export const VisualizarCanchas = () => {
  const { id } = useParams();
  const [canchas, setCanchas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    obtenerCanchas(id)
      .then(data => setCanchas(data))
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, []);

  if (loading) return <h1>Cargando....</h1>;
  if (error) return <h1>Error proveniente del servidor</h1>;

  return (
    <>
      <NavBar />
      <div className='visual-cancha'>
        <p className="text-center mt-10 mb-4 text-2xl"><strong>Elija qué cancha quiere jugar</strong></p>
        <div className='cards m-0 p-0 box-border flex flex-wrap justify-center ml-14 gap-20'>
          {canchas.length !== 0 ? canchas.map((cancha, index) => (
            <div className='card p-4 border-4 shadow-lg' key={index}>
              <img
                className='border-2 w-60 h-52'
                src={
                  cancha.tipo === 'futbol' ? '../../../public/futbol.jpg' :
                  cancha.tipo === 'basquetbol' ? '../../../public/basquet.jpg' :
                  cancha.tipo === 'tennis' || 'padel' ? '../../../public/tennis.jpg' :
                  '../../../public/icons.png'
                }
                alt="mi cancha"
              />
              <h2 className='mt-8'><strong>nombre:</strong>{cancha.nombre}</h2>
              <h2><strong>tipo:</strong>{cancha.tipo}</h2>
              <h2><strong>precio:</strong>{cancha.precio}</h2>
              <Link to={`/socio/elegirhorario/${cancha.id_cancha}`}>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                  value={cancha.nombre}
                >
                  Visualizar Horarios
                </button>
              </Link>
            </div>
          )) : <h1 className="mt-10">No hay canchas disponibles en este momento</h1>}
        </div>
      </div>
    </>
  );
}

export default VisualizarCanchas;