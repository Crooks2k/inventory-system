import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddEmployeeModal = ({ show, handleClose, token, role }) => {
  const [newEmployee, setNewEmployee] = useState({
    nickName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const handleAddEmployee = () => {
    
    if (role !== 'admin') {
      Swal.fire({
        icon: 'error',
        title: 'You do not have administrator permissions',
        text: 'Only administrators can add employees.',
      });
      return;
    }
   
    axios.post('https://cugusacompany.onrender.com/api/users/create', newEmployee, {
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        
        handleClose();
       
        Swal.fire({
          icon: 'success',
          title: 'Employee successfully added',
          text: 'The new employee has been successfully added.',
        });
      })
      .catch((error) => {
        console.error('Error al agregar el empleado:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error adding employee',
          text: 'An error occurred while trying to add the employee.',
        });
      });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>NickName</label>
            <input
              type="text"
              name="nickName"
              value={newEmployee.nickName}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={newEmployee.email}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={newEmployee.password}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddEmployee}>
          Add Employee
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEmployeeModal;
