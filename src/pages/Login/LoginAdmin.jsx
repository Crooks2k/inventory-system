import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
import logo from "../../assets/images/logo.png";
import "../../pages/Login/Login.css";
import MediaQuery from "react-responsive";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://cugusainventory.onrender.com/api/superAdmin/signin",
        {
          email,
          password,
        }
      );

      // Almacenar el token y el rol en el localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.userFound.roles[0].name);

      // Redirigir al panel de administración
      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
        text: "Error, please verify your credentials and try to log in again",
        confirmButtonColor: "#0ea5e9",
      });
      console.error(error);
    }
  };

  return (
    <div>
      <img src={logo} className="logo" alt="" />
      <MediaQuery minWidth={768} maxWidth={1300}>
        <form onSubmit={handleSubmit}>
          <MDBContainer className="p-3 my-5 d-flex flex-column w-75 rounded-4 text-bg-light align-items-center container-style">
            <h2 className="title-login mt-4 px-4" style={{"color": "#1570EF", "fontWeight": "bold"}}>
              Welcome to Cugusa Company Inventory System
            </h2>
            <MDBInput
              wrapperClass="mb-4 w-75 "
              placeholder="Email"
              id="form1"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4 w-75 pb-4"
              placeholder="Enter your password"
              id="form2"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="btn btn-primary btn-lg w-50 mt-4 mb-4" style={{"fontWeight": "bold"}}>Sign In</button>
          </MDBContainer>
        </form>
      </MediaQuery>

      <MediaQuery maxWidth={767}>
        <form onSubmit={handleSubmit}>
          <MDBContainer className="p-4                         my-5 d-flex flex-column w-100 rounded-4 text-bg-light align-items-center container-style">
            <h2 className="title-login" style={{"color": "#1570EF", "fontWeight": "bold"}}>
              Welcome to Cugusa Company Inventory System
            </h2>
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
            <button className="btn btn-primary btn-lg w-50 mt-4" style={{"fontWeight": "bold"}}>Sign In</button>
          </MDBContainer>
        </form>
      </MediaQuery>

      <MediaQuery minWidth={1301}>
        <form onSubmit={handleSubmit}>
          <MDBContainer className="p-3 my-5 d-flex flex-column w-50 rounded-4 text-bg-light align-items-center container-style" style={{"color": "#1570EF", "fontWeight": "bold"}}>
            <h3 className="title-login mt-4">
              Welcome to Cugusa Company Inventory System
            </h3>
            <MDBInput
              wrapperClass="mb-4 w-75 "
              placeholder="Email"
              id="form1"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4 pb-4 w-75 "
              placeholder="Enter your password"
              id="form2"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="btn btn-primary btn-lg w-50 mt-4 mb-4" style={{"fontWeight": "bold"}}>Sign In</button>
          </MDBContainer>
        </form>
      </MediaQuery>
    </div>
  );
}
