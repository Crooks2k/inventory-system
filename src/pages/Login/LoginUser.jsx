//Imports various React libraries and modules that are used within the component
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
  }
  from "mdb-react-ui-kit";
import "../../pages/Login/Login.css"

//create two states for the user's email and password using the useState hook.
export default function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    //Consuming API
    try {
      const response = await axios.post("https://cugusacompany.onrender.com/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Inicio de sesión satisfactorio'
      })
      navigate("/newProduct");
    } 
    
    catch (error) {
    //Login structure
    Swal.fire({
        icon: 'error',
        title: 'Datos incorrectos',
        text: 'Intentelo de nuevos',
        confirmButtonColor: '#0ea5e9'

      });
    
      console.error(error);
      
    }
  };

  return (
    //Login structure
   <div>
    <img src={logo} className="logo" alt="" />
     <form  onSubmit={handleSubmit}>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50 rounded-4 align-items-center container-style">
    <h2 className="title-login">Enter the panel</h2>
    <h3>Employees</h3>
<MDBInput wrapperClass='mb-4 w-75 ' placeholder="Email" id='form1' type='email'     value={email}
          onChange={(event) => setEmail(event.target.value)
          }/>
<MDBInput wrapperClass='mb-4 w-75 ' placeholder="Enter your password" id='form2' type='password'  value={password}
          onChange={(event) => setPassword(event.target.value)}/>

<div className="d-flex justify-content-between mx-3 mb-4">
  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
</div>

<button className="btn btn-primary btn-lg w-50">Sign In</button>
<Link to={"/"}><button  className="btn btn-primary m-3">Administrator</button></Link>


</MDBContainer>
    </form>

   </div>

  );
}
