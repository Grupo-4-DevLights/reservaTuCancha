import { HomePage } from "../src/Pages/_IndexHomePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppContext } from "../src/context/userContext";
import { IndexLogin } from "../src/Pages/_IndexLogin";
import { IndexRegister } from "../src/Pages/_IndexRegister";
import { IndexDashboard } from "./RouteProfile";
import { IndexProfile } from "../src/Pages/_IndexProfile";
import { PaginaDeError } from "../src/Pages/PaginaDeError";
import { PaginaDeCarga } from "../src/Pages/PaginaDeCarga";
import { IndexReserva } from "../src/Pages/_IndexReserva";

//verificar disponibilidad de canchas y reservar
import { VisualizarHorarios } from "../src/Components/Socio/VisualizarHorarios";
import { VisualizarEmpresas } from "../src/Components/Socio/VisualizarEmpresas";
import { VisualizarCanchas } from "../src/Components/Socio/VisualizarCanchas";
import ListarSociosPage from "../src/Pages/_ListarSocios";
import ListarEmpresasPage from "../src/Pages/_ListarEmpresas"

//import { RegistrarReserva } from './Pages/Socio/RegistrarReserva'

export default function AppRoutes() {
  const { user, isLoggedIn } = useAppContext();
  // todo Falta mejorar la logica
  // if(isLoggedIn){
  //     return(
  //         <PaginaDeCarga/>
  //     )
  // }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<IndexDashboard />} />
          {isLoggedIn && (
            <Route
              path="/perfil"
              element={user ? <IndexProfile /> : <Navigate to="/login" />}
            />
          )}
          <Route
            path="/ingresar"
            element={!isLoggedIn ? <IndexLogin /> : <Navigate to="/perfil" />}
          />
          <Route
            path="/registrar"
            element={
              !isLoggedIn ? <IndexRegister /> : <Navigate to="/perfil" />
            }
          />
          <Route path="/reserva" element={<IndexReserva />} />
          <Route path="/listar-socios" element={<ListarSociosPage />} />
          <Route path="/listar-empresas" element={<ListarEmpresasPage />} />
          <Route path="/socio/elegirempresa" element={<VisualizarEmpresas />} />
          <Route
            path="/socio/elegircancha/:id/"
            element={<VisualizarCanchas />}
          />
          <Route
            path="/socio/elegirhorario/:id/"
            element={<VisualizarHorarios />}
          />
          {isLoggedIn && <Route path="*" element={<PaginaDeError />} />}
        </Routes>
      </BrowserRouter>
    </>
  );
}
