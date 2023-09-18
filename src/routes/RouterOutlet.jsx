import React from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import LoginAdmin from '../pages/Login/LoginAdmin'
import Home from '../pages/Home/Home'
import NotFound from '../core/layout/NotFound/NotFound'
import NewProduct from '../pages/NewProduct/NewProduct'
import Recovery from '../pages/Password-recovery/Recovery'
import Employees from '../pages/Employees/Employees'
import LoginUser from '../pages/Login/LoginUser'

const RouterOutlet = () => {
  return (
   <>
        <Routes>
            <Route path='/' element={<LoginAdmin/>}/>
            <Route path='/dashboard' element={<Home/>}/>
            <Route path="/newProduct" element={<NewProduct/>}/>
            <Route path="/recovery" element={<Recovery/>}/>
            <Route path="/employees" element={<Employees/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/loginuser" element={<LoginUser/>}/>
            {/* Queda faltante desarrollar la logica de protección de rutas usando una instancia de un servicio para validar
             la sesion usando un Token */}
        </Routes>
    </>
  )
}

export default RouterOutlet