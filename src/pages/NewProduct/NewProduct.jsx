import React, { useState } from 'react';
import axios from 'axios';
import Home from '../Home/Home'
import '../NewProduct/NewProduct.css'

function NewProduct(token) {
  const [formData, setFormData] = useState({
    nameProducts: '',
    imgProduct: '',
    measures: 0,
    description: '',
    price: 0,
    price2: 0,
    price3: 0,
    price4: 0,
    price5: 0,
    price6: 0,
    price7: 0,
    price8: 0,
    availability: 0,
    category: '', // Mantén el campo como una cadena
  });
  console.log(formData)
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Si el campo es un precio, disponibilidad o medidas, convierte el valor a un número entero
    const newValue = (name.startsWith('price') || name === 'availability' || name === 'measures') ? parseInt(value, 10) : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener el token del localStorage
    const authToken = localStorage.getItem("token");
    // Verifica si el token de autenticación está presente
    if (!authToken) {
      console.error('No se encontró el token de autenticación');
      return;
    }
    // Convierte la categoría en un array, dividiendo por comas
    const categories = formData.category.split(',').map((category) => category.trim());
   

    // Cambiar formData a nivel principal
    const requestData = {
      formData,
      category: categories,
    };

    try {
      // Envía la solicitud con el token de autenticación
      await axios.post('https://cugusacompany.onrender.com/api/products/', requestData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Asegúrate de establecer el tipo de contenido adecuado
        },
      });

      alert('Producto registrado exitosamente');
      // Puedes redirigir al usuario o realizar otras acciones después de enviar los datos
    } catch (error) {
      console.error('Error al registrar el producto:', error);
    }
  };



  return (
    <>
  <Home />
    <div className='container-form'>
    <h2>CREATE NEW PRODUCT</h2>
      <form onSubmit={handleSubmit}>
        {/* Agrega aquí los campos del formulario */}
        <div className='campo'>
          <label htmlFor="nameProducts">Product name:</label>
          <input
            type="text"
            id="nameProducts"
            name="nameProducts"
            value={formData.nameProducts}
            onChange={handleChange}
            required
            placeholder='Product name'
          />
        </div>
       
        <div className='campo'>
          <label htmlFor="imgProduct">Image URL:</label>
          <input
            type="text"
            id="imgProduct"
            name="imgProduct"
            value={formData.imgProduct}
            onChange={handleChange}
            required
            placeholder='Image URL'
          />
        </div>

        <div className='campo'>
          <label htmlFor="measures">Measures:</label>
          <input
            type="number"
            id="measures"
            name="measures"
            value={formData.measures}
            onChange={handleChange}
            required
          />
        </div>

        <div className='campo'>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder='Description'
          />
        </div>

        <div className='campo'>
          <label htmlFor="price">Price West Palm Beach:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label htmlFor="price2">Price Stuart</label>
          <input
            type="number"
            id="price2"
            name="price2"
            value={formData.price2}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label htmlFor="price3">Price Daytona Beach</label>
          <input
            type="number"
            id="price3"
            name="price3"
            value={formData.price3}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label htmlFor="price4">Price Jacksonville</label>
          <input
            type="number"
            id="price4"
            name="price4"
            value={formData.price4}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label htmlFor="price5">Price Houston</label>
          <input
            type="number"
            id="price5"
            name="price5"
            value={formData.price5}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label htmlFor="price6">Price Dallas</label>
          <input
            type="number"
            id="price6"
            name="price6"
            value={formData.price6}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label htmlFor="price7">Price Beaumont</label>
          <input
            type="number"
            id="price7"
            name="price7"
            value={formData.price7}
            onChange={handleChange}
            required
          />
        </div>

        <div className='campo'>
          <label htmlFor="price8">Price New Orleans</label>
          <input
            type="number"
            id="price8"
            name="price8"
            value={formData.price8}
            onChange={handleChange}
          />
        </div>

        <div className='campo'>
          <label htmlFor="availability">Availability:</label>
          <input
            type="number"
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
          />
        </div>

        <div className='campo'>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder='Category'
          />
        </div>
      <button className='button' type="submit">Add new product</button>
      </form>
      
    </div>
    </>
  );
}

export default NewProduct;
