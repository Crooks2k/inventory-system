import React from "react";
import "./AsideMenu.css";
import { Nav, NavItem } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import { FiHome } from "react-icons/fi";
import { PiPackageDuotone } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";
import MediaQuery from "react-responsive";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

const AsideMenu = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <MediaQuery minWidth={950}>
        <div
          className="d-flex flex-column p-3 min-vh-100 text-bg-light"
          style={{ width: "260px" }}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none mx-auto"
          >
            <span className="fs-4">
              <img src={Logo} alt="Page Logo" width="100px" />
            </span>
          </a>
          <Nav className="flex-column mb-auto ms-4 mt-4">
            <NavItem className="mt-3">
              <Nav.Link to="/dashboard" as={Link}>
                <FiHome
                  className={`${
                    useLocation().pathname === "/dashboard"
                      ? "active activeLine pb-1 me-1 fs-5"
                      : "navItem pb-1 me-1 fs-5"
                  }`}
                />
                <span
                  className={`${
                    useLocation().pathname === "/dashboard"
                      ? "active"
                      : "navItem"
                  }`}
                >
                  Dashboard
                </span>
              </Nav.Link>
            </NavItem>
            <NavItem className="mt-3">
              <Nav.Link to="/newProduct" as={Link}>
                <PiPackageDuotone
                  className={`${
                    useLocation().pathname === "/newProduct"
                      ? "active activeLine pb-1 me-1 fs-5"
                      : "navItem pb-1 me-1 fs-5"
                  }`}
                />
                <span
                  className={`${
                    useLocation().pathname === "/newProduct"
                      ? "active"
                      : "navItem"
                  }`}
                >
                  New Product
                </span>
              </Nav.Link>
            </NavItem>
            <NavItem className="mt-3">
              <Nav.Link to="/employees" as={Link}>
                <VscAccount
                  className={`${
                    useLocation().pathname === "/employees"
                      ? "active activeLine pb-1 me-1 fs-5"
                      : "navItem pb-1 me-1 fs-5"
                  }`}
                />
                <span
                  className={`${
                    useLocation().pathname === "/employees"
                      ? "active"
                      : "navItem"
                  }`}
                >
                  Employees
                </span>
              </Nav.Link>
            </NavItem>
          </Nav>
          <hr />
          <NavItem className="mx-auto">
            <Nav.Link to="/" as={Link}>
              <MdLogout className="navItem mb-1" />{" "}
              <span className="navItem">Logout</span>
            </Nav.Link>
          </NavItem>
        </div>
      </MediaQuery>

      <MediaQuery minWidth={500} maxWidth={950}>
        <div
          className="d-flex flex-column  min-vh-100 text-bg-light"
          style={{ width: "80px" }}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 mt-3 text-white text-decoration-none mx-auto"
          >
            <span className="fs-4">
              <img src={Logo} alt="Page Logo" width="60px" />
            </span>
          </a>
          <Nav className="flex-column mb-auto mx-auto mt-3">
            <NavItem>
              <Nav.Link to="/dashboard" as={Link}>
                <FiHome
                  className={`${
                    useLocation().pathname === "/dashboard"
                      ? "active activeLine fs-4"
                      : "navItem fs-4"
                  }`}
                />
              </Nav.Link>
            </NavItem>
            <hr />
            <NavItem className="mt-2">
              <Nav.Link to="/newProduct" as={Link}>
                <PiPackageDuotone
                  className={`${
                    useLocation().pathname === "/newProduct"
                      ? "active activeLine fs-4"
                      : "navItem fs-4"
                  }`}
                />
              </Nav.Link>
            </NavItem>
            <hr />
            <NavItem className="mt-2">
              <Nav.Link to="/employees" as={Link}>
                <VscAccount
                  className={`${
                    useLocation().pathname === "/employees"
                      ? "active activeLine fs-4"
                      : "navItem fs-4"
                  }`}
                />
              </Nav.Link>
            </NavItem>
          </Nav>
          <hr />
          <NavItem className="mx-auto mb-3">
            <Nav.Link to="/" as={Link}>
              <MdLogout className="navItem mb-1 fs-4" />
            </Nav.Link>
          </NavItem>
        </div>
      </MediaQuery>

      <MediaQuery minWidth={320} maxWidth={500}>
        <AiOutlineMenu onClick={handleShow} className="fs-1 m-butt" />

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <span className="fs-4">
                <img src={Logo} alt="Page Logo" width="70px" />
              </span>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column mb-auto mx-auto">
              <NavItem className="mt-3">
                <Nav.Link to="/dashboard" as={Link}>
                  <FiHome
                    className={`${
                      useLocation().pathname === "/dashboard"
                        ? "active activeLine pb-1 me-1 fs-5"
                        : "navItem pb-1 me-1 fs-5"
                    }`}
                  />
                  <span
                    className={`${
                      useLocation().pathname === "/dashboard"
                        ? "active"
                        : "navItem"
                    }`}
                  >
                    Dashboard
                  </span>
                </Nav.Link>
              </NavItem>
              <NavItem className="mt-3">
                <Nav.Link to="/newProduct" as={Link}>
                  <PiPackageDuotone
                    className={`${
                      useLocation().pathname === "/newProduct"
                        ? "active activeLine pb-1 me-1 fs-5"
                        : "navItem pb-1 me-1 fs-5"
                    }`}
                  />
                  <span
                    className={`${
                      useLocation().pathname === "/newProduct"
                        ? "active"
                        : "navItem"
                    }`}
                  >
                    New Product
                  </span>
                </Nav.Link>
              </NavItem>
              <NavItem className="mt-3">
                <Nav.Link to="/employees" as={Link}>
                  <VscAccount
                    className={`${
                      useLocation().pathname === "/employees"
                        ? "active activeLine pb-1 me-1 fs-5"
                        : "navItem pb-1 me-1 fs-5"
                    }`}
                  />
                  <span
                    className={`${
                      useLocation().pathname === "/employees"
                        ? "active"
                        : "navItem"
                    }`}
                  >
                    Employees
                  </span>
                </Nav.Link>
              </NavItem>
            </Nav>
            <hr />
            <NavItem className="mx-auto">
              <Nav.Link to="/" as={Link}>
                <MdLogout className="navItem mb-1" />{" "}
                <span className="navItem">Logout</span>
              </Nav.Link>
            </NavItem>
          </Offcanvas.Body>
        </Offcanvas>
      </MediaQuery>
    </>
  );
};

export default AsideMenu;
