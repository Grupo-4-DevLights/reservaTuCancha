import { useState } from 'react'
import { HomePage } from './Pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserProvider from './Services/Authentication'
import { IndexLogin } from './Pages/Login/_IndexLogin'
import { IndexRegister } from './Pages/Register/_IndexRegister'
import { IndexDashboard } from './Pages/Dashboard/_IndexDashboard'

function App() {

  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/dashboard" element={<IndexDashboard/>}/>
            <Route path="/login" element={<IndexLogin/>}/>
            <Route path="/register" element={<IndexRegister/>}/>
          </Routes>
        </UserProvider>
      </BrowserRouter>  
    </>    
  
  )
}

export default App
