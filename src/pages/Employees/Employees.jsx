import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination"; 
import "./Employees.css";
import AsideMenu from "../../core/layout/Aside/AsideMenu";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AddEmployeeModal from "./AddEmployeeModal";

const Employees = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (role === "admin") {
      axios
        .get("https://cugusacompany.onrender.com/api/users/usersByRole", {
          headers: {
            "X-Access-Token": token,
          },
        })
        .then((response) => {
          setEmployees(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de empleados:", error);
        });
    } else if (role === "user") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You do not have sufficient permissions to enter this location!",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
    }
  }, [role, navigate, token]);

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const updateEmployeeList = () => {
    axios
      .get("https://cugusacompany.onrender.com/api/users/usersByRole", {
        headers: {
          "X-Access-Token": token,
        },
      })
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de empleados:", error);
      });
  };

  const handleDeleteUser = (id) => {
    // Verificar si el usuario actual tiene el rol de administrador
    if (role !== "admin") {
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "No tienes permisos para eliminar usuarios.",
      });
      return;
    }
  
    // Si el usuario es administrador, realizar la petición de eliminación
    axios
      .delete(`https://cugusacompany.onrender.com/api/users/${id}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== id)
        );
  
        Swal.fire({
          icon: "success",
          title: "Usuario eliminado con éxito",
          text: "El usuario ha sido eliminado correctamente.",
        });
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error);
  
        Swal.fire({
          icon: "error",
          title: "Error al eliminar el usuario",
          text: "Ha ocurrido un error al intentar eliminar el usuario.",
        });
      });
    console.log(id);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="d-flex">
        <aside>
          <AsideMenu />
        </aside>
        <main className="w-100">
          <div>
            {role === "admin" ? (
              <>
                <h2>Lista de Empleados</h2>
                <div className="d-flex justify-content-end mb-3">
  <button
    className="btn btn-sm btn-primary font-weight-bold"
    onClick={handleShowAddModal}
  >
    Add New Employee
  </button>
</div>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>LastConnect</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((employee, index) => (
                      <tr key={employee._id}>
                        <td>{index + 1 + indexOfFirstItem}</td>
                        <td>{employee.nickName}</td>
                        <td>{employee.email}</td>
                        <td>
                          {employee.lastConnect
                            ? new Date(employee.lastConnect).toLocaleString()
                            : "N/A"}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteUser(employee._id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination>
                  {Array.from(
                    { length: Math.ceil(employees.length / itemsPerPage) },
                    (_, index) => (
                      <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    )
                  )}
                </Pagination>
              </>
            ) : (
              <p>No tienes permisos para ver esta información.</p>
            )}
          </div>

          <AddEmployeeModal
            show={showAddModal}
            handleClose={handleCloseAddModal}
            token={token}
            role={role}
            updateEmployeeList={updateEmployeeList}
          />
        </main>
      </div>
    </>
  );
};

export default Employees;
