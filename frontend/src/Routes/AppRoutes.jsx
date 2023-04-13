import { HomePage } from "../Pages/_IndexHomePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppContext } from "../context/userContext";
import { IndexLogin } from "../Pages/_IndexLogin";
import { IndexRegister } from "../Pages/_IndexRegister";
import { IndexDashboard } from "./RouteProfile";
import { IndexProfile } from "../Pages/_IndexProfile";
import { PaginaDeError } from "../Pages/PaginaDeError";
import { IndexReserva } from "../Components/Profile/Socio/Reservas/_IndexReserva";
import { Reservas }  from "../Pages/_Reservas";

import { VisualizarHorarios } from "../Components/Socio/VisualizarHorarios";
import { VisualizarEmpresas } from "../Components/Socio/VisualizarEmpresas";
import { VisualizarCanchas } from "../Components/Socio/VisualizarCanchas";
import ListarSociosPage from "../Pages/_ListarSocios";
import ListarEmpresasPage from "../Pages/_ListarEmpresas";
import ListarCanchasPage from "../Pages/_ListarCanchas";


export function AppRoutes() {
  const { user, isLoggedIn } = useAppContext();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<IndexDashboard />} />
          <Route path="/perfil" element={isLoggedIn && user ? (<IndexProfile />) : (<Navigate to="/ingresar" />)} />
          <Route path="/ingresar" element={!user ? <IndexLogin /> : <Navigate to="/" />} />
          <Route path="/registrar" element={!isLoggedIn ? <IndexRegister /> : <Navigate to="/perfil" />}/>
          <Route path="/reserva" element={<Reservas />} />
          <Route path="/reservas" element={<IndexReserva />} />
          <Route path="/listar-socios" element={<ListarSociosPage />} />
          <Route path="/listar-empresas" element={<ListarEmpresasPage />} />
          <Route path="/listar-canchas" element={<ListarCanchasPage />} />
          <Route path="/socio/elegirempresa" element={<VisualizarEmpresas />} />
          <Route path="/socio/elegircancha/:id/" element={<VisualizarCanchas />}/>
          <Route path="/socio/elegirhorario/:id/" element={<VisualizarHorarios />} />
          {isLoggedIn && <Route path="*" element={<PaginaDeError />} />}
        </Routes>
      </BrowserRouter>
    </>
  );
}
