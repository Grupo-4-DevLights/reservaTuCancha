import { HomePage } from "../src/Pages/_IndexHomePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppContext } from "../src/context/userContext";
import { IndexLogin } from "../src/Pages/_IndexLogin";
import { IndexRegister } from "../src/Pages/_IndexRegister";
import { IndexDashboard } from "./RouteProfile";
import { IndexProfile } from "../src/Pages/_IndexProfile";
import { PaginaDeError } from "../src/Pages/PaginaDeError";
import { PaginaDeCarga } from "../src/Pages/PaginaDeCarga";
import { IndexReserva } from "../src/Components/Profile/Socio/Reservas/_IndexReserva";

//verificar disponibilidad de canchas y reservar
import { VisualizarHorarios } from "../src/Components/Socio/VisualizarHorarios";
import { VisualizarEmpresas } from "../src/Components/Socio/VisualizarEmpresas";
import { VisualizarCanchas } from "../src/Components/Socio/VisualizarCanchas";
import ListarSociosPage from "../src/Pages/_ListarSocios";
import ListarEmpresasPage from "../src/Pages/_ListarEmpresas";
import ListarCanchasPage from "../src/Pages/_ListarCanchas";


import  {ElegirCanchaPropietario} from "../src/Components/Profile/Propietario/administracion/ElegirCanchaPropietario";
import ButtonsPropietario from "../src/Components/Profile/Propietario/administracion/ButtonsPropietario";
import  HorariosDisponiblesPropietarios  from "../src/Components/Profile/Propietario/administracion/HorariosDisponiblesPropietarios";



//Dia de la semana
import SelectorDeDias from "../src/Components/Socio/VisualizarDiasSemana";


//notificaciones
import { NotificacionesSocio } from "../src/Components/Profile/Socio/Notificaciones/Notificaciones";

//reservas de cancha
import { ReservasPropietarios } from "../src/Components/Profile/Propietario/Reservas/ReservasPropietario";

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

          <Route
            path="/perfil"
            element={isLoggedIn && user ? (<IndexProfile />) : (<Navigate to="/ingresar" />)}
          />

          <Route
            path="/ingresar"
            element={!user ? <IndexLogin /> : <Navigate to="/" />}
          />
          <Route
            path="/registrar"
            element={
              !isLoggedIn ? <IndexRegister /> : <Navigate to="/perfil" />
            }
          />
          <Route path="/reservas" element={<IndexReserva />} />
          <Route path="/listar-socios" element={<ListarSociosPage />} />
          <Route path="/listar-empresas" element={<ListarEmpresasPage />} />
          <Route path="/listar-canchas" element={<ListarCanchasPage />} />
          <Route path="/socio/elegirempresa" element={<VisualizarEmpresas />} />
          <Route
            path="/socio/elegircancha/:id/"
            element={<VisualizarCanchas />}
          />
          <Route
            path="/socio/elegirhorario/:id/"
            element={<SelectorDeDias />}
          />

          <Route
            path="/socio/elegirhorario/:id/:dia"
            element={<VisualizarHorarios/>} 
          />

          <Route
            path="/propietario/elegirhorario/:id/:dia"
            element={<HorariosDisponiblesPropietarios/>}
          />


          

          <Route path="/socio/diasemana" element={<SelectorDeDias/>}/>
          <Route path="/notificaciones" element={<NotificacionesSocio/>} />
          
          <Route path="/propietario/administrar_reserva" element={<ElegirCanchaPropietario/>} />
          <Route path='/propietario/buttonPropietario/:id'  element={<ButtonsPropietario/>}/>



          {isLoggedIn && <Route path="*" element={<PaginaDeError />} />}
        </Routes>
      </BrowserRouter>
    </>
  );
}
