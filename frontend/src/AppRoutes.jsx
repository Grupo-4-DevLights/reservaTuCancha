import { HomePage } from './Pages/HomePage/_IndexHomePage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import  { useAppContext } from './context/userContext'
import { IndexLogin } from './Pages/Login/_IndexLogin'
import { IndexRegister } from './Pages/Register/_IndexRegister'
import { IndexDashboard } from './Pages/Dashboard/_IndexDashboard'
import { Profile } from './Pages/Dashboard/Perfil/Profile'
import { IndexReserva } from './Pages/Reserva/_IndexReserva'
import { PaginaDeError } from './Pages/PaginaDeError'
import { PaginaDeCarga } from './Pages/PaginaDeCarga'


export default function AppRoutes() {
    const {  user,  isLoggedIn} = useAppContext();
    // todo Falta mejorar la logica
    // if(isLoggedIn){
    //     return(
    //         <PaginaDeCarga/>
    //     )
    // }
    return (
        <>
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<IndexDashboard />} />
                    {isLoggedIn && <Route path="/perfil" element={user ? <Profile /> : <Navigate to="/login" /> } />}
                    <Route path="/ingresar" element={!isLoggedIn ? <IndexLogin /> : <Navigate to="/perfil" />} />
                    <Route path="/registrar" element={!isLoggedIn ? <IndexRegister />: <Navigate to="/perfil"/>} />
                    <Route path="/reserva" element={<IndexReserva />} />
                    {isLoggedIn && <Route path='*' element={<PaginaDeError />} />}
                </Routes>
            </BrowserRouter>
        </>
    )
}


