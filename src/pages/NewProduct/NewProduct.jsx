import React, { useState, useEffect } from "react";
import axios from "axios";
import AsideMenu from "../../core/layout/Aside/AsideMenu";
import "../NewProduct/NewProduct.css";
import MediaQuery from "react-responsive";
import Swal from "sweetalert2";

function NewProduct() {
  const initialFormData = {
    nameProducts: "",
    imgProduct: "",
    measures: 0,
    description: "",
    price: 0,
    price2: 0,
    price3: 0,
    price4: 0,
    price5: 0,
    price6: 0,
    price7: 0,
    price8: 0,
    availability: true,
    category: "",
    quantity: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);

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
    } else {
      newValue = value;
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("token");

    if (!authToken) {
      console.error("No se encontró el token de autenticación");
      console.error("No se encontró el token de autenticación");
      return;
    }

    try {
      await axios.post(
        "https://cugusacompany.onrender.com/api/products/",
        formData,
        {
          headers: {
            "x-access-token": authToken,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Product successfully added',
        text: 'The new product has been successfully added.',
      });

      // Restablecer el estado del formulario a "initialFormData"
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error al registrar el producto:", error);
      console.error("Error al registrar el producto:", error);
    }
  };

  return (
    <>
      <div className="d-flex">
        <aside>
          <AsideMenu />
        </aside>
        <main className="w-100">
          <MediaQuery maxWidth={768}>
            <div className="container-form">
              <h2>CREATE NEW PRODUCT</h2>
              <form onSubmit={handleSubmit}>
                <div className="campo">
                  <label htmlFor="nameProducts">Product name:</label>
                  <input
                    type="text"
                    id="nameProducts"
                    name="nameProducts"
                    value={formData.nameProducts}
                    onChange={handleChange}
                    required
                    placeholder="Product name"
                  />
                </div>

                <div className="campo">
                  <label htmlFor="imgProduct">Image URL:</label>
                  <input
                    type="text"
                    id="imgProduct"
                    name="imgProduct"
                    value={formData.imgProduct}
                    onChange={handleChange}
                    required
                    placeholder="Image URL"
                  />
                </div>

                <div className="campo">
                  <label htmlFor="measures">Measures CM:</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="measures"
                    name="measures"
                    value={formData.measures}
                    onChange={handleChange}
                    required
                  >
                    <option selected>Open this select menu</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

                <div className="campo">
                  <label htmlFor="description">Description:</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Description"
                  />
                </div>

                <div className="campo">
                  <label htmlFor="price">Price West Palm Beach:</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="price2">Price Stuart</label>
                  <input
                    type="number"
                    id="price2"
                    name="price2"
                    value={formData.price2}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="price3">Price Daytona Beach</label>
                  <input
                    type="number"
                    id="price3"
                    name="price3"
                    value={formData.price3}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="price4">Price Jacksonville</label>
                  <input
                    type="number"
                    id="price4"
                    name="price4"
                    value={formData.price4}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="price5">Price Houston</label>
                  <input
                    type="number"
                    id="price5"
                    name="price5"
                    value={formData.price5}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="price6">Price Dallas</label>
                  <input
                    type="number"
                    id="price6"
                    name="price6"
                    value={formData.price6}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="price7">Price Beaumont</label>
                  <input
                    type="number"
                    id="price7"
                    name="price7"
                    value={formData.price7}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="price8">Price New Orleans</label>
                  <input
                    type="number"
                    id="price8"
                    name="price8"
                    value={formData.price8}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="quantity">Cantidad</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="availability">Availability:</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="availability"
                    name="availability"
                    value={formData.availability.toString()}
                    onChange={handleChange}
                    required
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div className="campo">
                  <label htmlFor="category">Category:</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="category"
                    name="category"
                    value={formData.category}
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
                  </select>
                </div>
                <button className="button" type="submit">
                  Add new product
                </button>
              </form>
            </div>
          </MediaQuery>

          <MediaQuery minWidth={769}>
            <div className="container-form">
              <h2>CREATE NEW PRODUCT</h2>
              <form onSubmit={handleSubmit}>
                <div className="campo">
                  <label htmlFor="nameProducts">Product name:</label>
                  <input
                    type="text"
                    id="nameProducts"
                    name="nameProducts"
                    value={formData.nameProducts}
                    onChange={handleChange}
                    required
                    placeholder="Product name"
                  />
                </div>

                <div className="campo">
                  <label htmlFor="imgProduct">Image URL:</label>
                  <input
                    type="text"
                    id="imgProduct"
                    name="imgProduct"
                    value={formData.imgProduct}
                    onChange={handleChange}
                    required
                    placeholder="Image URL"
                  />
                </div>

                <div className="campo">
                  <label htmlFor="measures">Measures CM:</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="measures"
                    name="measures"
                    value={formData.measures}
                    onChange={handleChange}
                    required
                  >
                    <option selected>Open this select menu</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

                <div className="campo">
                  <label htmlFor="description">Description:</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Description"
                  />
                </div>

                <div className="campo">
                  <label htmlFor="price">Price West Palm Beach:</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="price2">Price Stuart</label>
                  <input
                    type="number"
                    id="price2"
                    name="price2"
                    value={formData.price2}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="price3">Price Daytona Beach</label>
                  <input
                    type="number"
                    id="price3"
                    name="price3"
                    value={formData.price3}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="price4">Price Jacksonville</label>
                  <input
                    type="number"
                    id="price4"
                    name="price4"
                    value={formData.price4}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="price5">Price Houston</label>
                  <input
                    type="number"
                    id="price5"
                    name="price5"
                    value={formData.price5}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="price6">Price Dallas</label>
                  <input
                    type="number"
                    id="price6"
                    name="price6"
                    value={formData.price6}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="price7">Price Beaumont</label>
                  <input
                    type="number"
                    id="price7"
                    name="price7"
                    value={formData.price7}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="price8">Price New Orleans</label>
                  <input
                    type="number"
                    id="price8"
                    name="price8"
                    value={formData.price8}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="quantity">Cantidad</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="availability">Availability:</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="availability"
                    name="availability"
                    value={formData.availability.toString()}
                    onChange={handleChange}
                    required
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div className="campo">
                  <label htmlFor="category">Category:</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="category"
                    name="category"
                    value={formData.category}
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
                  </select>
                </div>
                <button className="button" type="submit">
                  Add new product
                </button>
              </form>
            </div>
          </MediaQuery>


        </main>
      </div>
    </>
  );
}
export default NewProduct;
