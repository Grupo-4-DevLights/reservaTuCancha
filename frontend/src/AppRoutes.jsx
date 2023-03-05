import { HomePage } from './Pages/HomePage/_IndexHomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppContext } from './Services/Authentication'
import { IndexLogin } from './Pages/Login/_IndexLogin'
import { IndexRegister } from './Pages/Register/_IndexRegister'
import { IndexDashboard } from './Pages/Dashboard/_IndexDashboard'
import { Profile } from './Pages/Dashboard/Perfil/Profile'
import { IndexReserva } from './Pages/Reserva/_IndexReserva'

export default function AppRoutes() {
    const { user } = useAppContext();
  

    return (
        <>
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<IndexDashboard />} />
                    {user  && <Route path="/perfil" element={<Profile />} />}
                    {user === undefined && <Route path="/ingresar" element={<IndexLogin />} />}
                    {user === undefined && <Route path="/registro" element={<IndexRegister />} />}
                    <Route path="/reserva" element={<IndexReserva />} />
                    <Route path='*' element={<h1>No existe la ruta</h1>} />

                </Routes>
            </BrowserRouter>
        </>
    )


}


