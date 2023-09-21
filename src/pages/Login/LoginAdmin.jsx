import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
import logo from "../../assets/images/logo.png";
import "../../pages/Login/Login.css";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://cugusacompany.onrender.com/api/superAdmin/signin",
        {
          email,
          password,
        }
      );

      // Almacenar el token en el localStorage
      localStorage.setItem("token", response.data.token);
    
      // Redirigir al panel de administración
      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Datos incorrectos",
        text: "Intentelo nuevamente",
        confirmButtonColor: "#0ea5e9",
      });
      console.error(error);
    }
  };

  return (
    <div>
      <img src={logo} className="logo" alt="" />
      <form onSubmit={handleSubmit}>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50 rounded-4 align-items-center container-style">
          <h2 className="title-login">Enter the panel</h2>
          <h3>Admin</h3>
          <MDBInput
            wrapperClass="mb-4 w-75 "
            placeholder="Email"
            id="form1"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4 w-75 "
            placeholder="Enter your password"
            id="form2"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="d-flex justify-content-between mx-3 mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
          </div>
          <button className="btn btn-primary btn-lg w-50">Sign In</button>
          <Link to={"/loginuser"}>
            <button className="btn btn-primary m-3">Employeer</button>
          </Link>
        </MDBContainer>
      </form>
    </div>
  );
}
