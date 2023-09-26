import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./Employees.css";
import AsideMenu from "../../core/layout/Aside/AsideMenu";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AddEmployeeModal from "./AddEmployeeModal";
import {MdDelete} from "react-icons/md";
import ReactPaginate from "react-paginate";


const Employees = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 10; 


  useEffect(() => {
    if (role === "admin") {
      axios
        .get("https://cugusainventory.onrender.com/api/users/usersByRole", {
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
      .get("https://cugusainventory.onrender.com/api/users/usersByRole", {
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

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const indexOfLastEmployee = (currentPage + 1) * perPage;
const indexOfFirstEmployee = indexOfLastEmployee - perPage;
const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const handleDeleteUser = (id) => {
    // Verificar si el usuario actual tiene el rol de administrador
    if (role !== "admin") {
      Swal.fire({
        icon: "error",
        title: "Access denied",
        text: "You do not have permissions to delete users.",
      });
      return;
    }
  
   
    const currentUserId = localStorage.getItem("userId");
  

    if (id === currentUserId) {
      Swal.fire({
        icon: "error",
        title: "Access denied",
        text: "You cannot delete your own user account.",
      });
      return;
    }
  

    Swal.fire({
      title: "Delete Employee",
      text: "Are you sure you want to delete this employee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
   
        axios
          .delete(`https://cugusainventory.onrender.com/api/users/${id}`, {
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
              title: "Successfully deleted user",
              text: "Successfully deleted user.",
            });
          })
          .catch((error) => {
            console.error("Error al eliminar el usuario:", error);
  
            Swal.fire({
              icon: "error",
              title: "Error deleting user",
              text: "An error occurred while trying to delete the user.",
            });
          });
      }
    });
  

  };
  

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
              <div className="title-employees">
              <h2 className="h2-employees">Employees</h2>
              </div>
                
                <div className="d-flex justify-content-end mb-3">
  <button
    className="btn btn-sm btn-primary font-weight-bold btn-employee"
    onClick={handleShowAddModal}
  >
    Add New Employee
  </button>
</div>
                <Table responsive className="table-employees">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>LastConnect</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEmployees.map((employee, index) => (
                      <tr key={employee._id}>
                        <td>{employee.nickName}</td>
                        <td>{employee.email}</td>
                        <td>
                          {employee.lastConnect
                            ? new Date(employee.lastConnect).toLocaleString()
                            : "N/A"}
                        </td>
                        <td>
                          <button className="trash-button"
                            onClick={() => handleDeleteUser(employee._id)}
                          >
                            <MdDelete className="trash-icon" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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
      <div className="mt-3 mb-4" id="Paginate">
          <ReactPaginate
  previousLabel="Prev"
  nextLabel="Next"
  previousClassName="paginate-butts"
  nextClassName="paginate-butts"
  pageCount={Math.ceil(employees.length / perPage)}
  onPageChange={handlePageChange}
  containerClassName="paginationBttns"
  activeClassName={"active_pagination"}
/>
</div>
        </main>
      </div>
    </>
  );
};

export default Employees;