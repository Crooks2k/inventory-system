import React from 'react'
import "./Employees.css"
import AsideMenu from '../../core/layout/Aside/AsideMenu'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Employees = () => {
  const navigate = useNavigate()

  const role = localStorage.getItem("role")
  if(role == "user"){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You do not have sufficient permissions to enter this location!',
    })
    setTimeout(() => {
      navigate("/dashboard")
    }, 500);
  }
  return (
   <>
    <div className="d-flex">
      <aside>
        <AsideMenu />
      </aside>
      <main className="w-100">
        
      </main>
    </div>
   </>
  )
}

export default Employees