import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
}
from "mdb-react-ui-kit";
import "../../pages/Login/Login.css"

//create two states for the user's email and password using the useState hook.
export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    //Consuming API
    try {
      const response = await axios.post("https://cugusacompany.onrender.com/api/superAdmin/signin", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Datos incorrectos',
            text: 'Intentelo nuevamente',
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
        <MDBContainer className="container-form p-3 my-5 d-flex flex-column w-50 rounded-4 align-items-center">
    <h2 className="title-login">Enter the panel</h2>
    <h3>Admin</h3>
<MDBInput wrapperClass='mb-4 w-75 ' placeholder="Email" id='form1' type='email'     value={email}
          onChange={(event) => setEmail(event.target.value)
          }/>
<MDBInput wrapperClass='mb-4 w-75 ' placeholder="Enter your password" id='form2' type='password'  value={password}
          onChange={(event) => setPassword(event.target.value)}/>

<div className="d-flex justify-content-between mx-3 mb-4">
  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
</div>

<button className="btn btn-primary btn-lg w-50">Sign In</button>
<Link to={"/loginuser"}><button  className="btn btn-primary m-3">Employeer</button></Link>


</MDBContainer>
    </form>

   </div>
  );
}
