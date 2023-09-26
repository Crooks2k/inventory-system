import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import MediaQuery from "react-responsive";
import { Accordion } from "react-bootstrap";
import axios from "axios";
import "./EditProductModal.css";
import { UpdateProduct } from "../../../../core/service/HomeService";

const EditProductModal = ({
  show,
  handleClose,
  product,
  fetchData,
  setchangedValue,
  changedValue,
}) => {
  const initialFormData = {
    nameProducts: product?.nameProducts || "",
    imgProduct: product?.imgProduct || "",
    measures: product?.measures || "",
    description: product?.description || "",
    price: product?.price || 0,
    price2: product?.price2 || 0,
    price3: product?.price3 || 0,
    price4: product?.price4 || 0,
    price5: product?.price5 || 0,
    price6: product?.price6 || 0,
    price7: product?.price7 || 0,
    price8: product?.price8 || 0,
    availability: product?.availability || false,
    category: product?.category || "",
    quantity: product?.quantity || 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);

  const sendEdit = async () => {
    Swal.fire({
      title: "Are you sure about the changes made??",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const authToken = localStorage.getItem("token");
        if (!authToken) {
          console.error("No se encontró el token de autenticación");
          return;
        }

        try {
          await UpdateProduct(
            "api/products/",
            authToken,
            product._id,
            formData
          );
          setchangedValue(formData?.availability);
          await fetchData();
          product = formData
          Swal.fire("Edited!", "Your product has been edited.", "success");
          handleClose();
        } catch (error) {
          console.error("Error al editar el producto", error);
        }
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue;

    if (name === "availability") {
      newValue = value === "true";
    } else if (
      name === "quantity" ||
      name.startsWith("price") ||
      name === "measures"
    ) {
      newValue = !isNaN(value) ? parseInt(value, 10) : 0;
    } else if (name === "category") {
      const selectedCategory = categories.find(
        (category) => category.filter === value
      );
      newValue = selectedCategory ? selectedCategory._id : "";
    } else {
      newValue = value;
    }

    setFormData({ ...formData, [name]: newValue });
  };

  useEffect(() => {
    const authToken = localStorage.getItem("token");

    if (!authToken) {
      console.error("No se encontró el token de autenticación");
      return;
    }

    axios
      .get("https://cugusacompany.onrender.com/api/category", {
        headers: {
          "x-access-token": authToken,
        },
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las categorías:", error);
      });
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#007bff" }}>
            Edit Product {formData?.nameProducts}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#007bff" }}>
                Product name:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name here"
                onChange={handleChange}
                value={formData?.nameProducts}
                name="nameProducts"
                autoFocus
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#007bff" }}>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product image url here"
                onChange={handleChange}
                value={formData?.imgProduct}
                name="imgProduct"
                autoFocus
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#007bff" }}>Measures CM:</Form.Label>
              <Form.Select
                type="text"
                placeholder="Product image url here"
                value={formData?.measures}
                name="measures"
                onChange={handleChange}
                autoFocus
                required
              >
                <option value="" disabled>
                  Measure Selected [{formData?.measures}]
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#007bff" }}>Description:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product description here"
                onChange={handleChange}
                value={formData?.description}
                name="description"
                required
                autoFocus
              />
            </Form.Group>

            <Form.Label style={{ color: "#007bff" }}>
              Prices per City:
            </Form.Label>
            <Accordion defaultActiveKey="1">
              <Accordion.Item eventKey="0">
                <Accordion.Header
                  className="accordion-head"
                  style={{ color: "#007bff" }}
                >
                  View configure values:
                </Accordion.Header>
                <Accordion.Body>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#007bff" }}>
                      Price West Palm Beach:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      onChange={handleChange}
                      value={formData?.price}
                      name="price"
                      required
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#007bff" }}>
                      Price Stuart:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      onChange={handleChange}
                      value={formData?.price2}
                      name="price2"
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#007bff" }}>
                      Price Daytona Beach:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      onChange={handleChange}
                      value={formData?.price3}
                      name="price3"
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#007bff" }}>
                      Price Jacksonville:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      onChange={handleChange}
                      value={formData?.price4}
                      name="price4"
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#007bff" }}>
                      Price Houston:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      onChange={handleChange}
                      value={formData?.price5}
                      name="price5"
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#007bff" }}>
                      Price Dallas:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      onChange={handleChange}
                      value={formData?.price6}
                      name="price6"
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#007bff" }}>
                      Price Beaumon:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      onChange={handleChange}
                      value={formData?.price7}
                      name="price7"
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label style={{ color: "#007bff" }}>
                      Price New Orleans:
                    </Form.Label>
                    <Form.Control
                      type="number"
                      onChange={handleChange}
                      value={formData?.price8}
                      name="price8"
                      autoFocus
                    />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Form.Group
              className="mb-3 mt-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label style={{ color: "#007bff" }}>Quantity:</Form.Label>
              <Form.Control
                type="number"
                onChange={handleChange}
                value={formData?.quantity}
                name="quantity"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#007bff" }}>
                Availability:
              </Form.Label>
              <Form.Select
                type="text"
                value={formData?.availability.toString()}
                name="availability"
                onChange={handleChange}
                autoFocus
                required
              >
                <option value="" disabled>
                  Select disponibility
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#007bff" }}>Category:</Form.Label>
              <Form.Select
                type="text"
                value={formData?.category.filter}
                name="category"
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {Array.isArray(categories) && categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category._id} value={category.filter}>
                      {category.filter}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No categories available
                  </option>
                )}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={sendEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProductModal;
