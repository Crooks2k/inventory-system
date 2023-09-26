import React from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import LoginAdmin from '../pages/Login/LoginAdmin'
import Home from '../pages/Home/Home'
import NotFound from '../core/layout/NotFound/NotFound'
import NewProduct from '../pages/NewProduct/NewProduct'
import Recovery from '../pages/Password-recovery/Recovery'
import Employees from '../pages/Employees/Employees'
import LoginUser from '../pages/Login/LoginUser'
import { NotFoundAdmin } from '../core/layout/NotFoundAdmin/NotFoundAdmin'

const RouterOutlet = () => {

  useLocation()
  return (
   <>
        <Routes>
            <Route path='/' element={<LoginAdmin/>}/>
            <Route path="*" element={
              localStorage.getItem("token") ? (
                <Routes>
                  <Route path='/dashboard' element={<Home/>}/>
                  <Route path="/newProduct" element={<NewProduct/>}/>
                  <Route path="/recovery" element={<Recovery/>}/>
                  <Route path="/employees" element={<Employees/>}/>
                  <Route path="/loginuser" element={<LoginUser/>}/>
                  <Route path='*' element={<NotFoundAdmin/>}/>
                </Routes>
              ) : (
                <Routes>
                  <Route path='*' element={<NotFound/>}/>
                </Routes>
              )
            }/>
        </Routes>
    </>
  )
}

export default RouterOutlet