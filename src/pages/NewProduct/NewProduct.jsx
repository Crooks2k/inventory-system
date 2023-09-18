import React, { useState } from 'react';
import axios from 'axios';

const NewProduct = () => {
  const [productData, setProductData] = useState({
    nameProducts: '',
    imgProduct: '',
    description: '',
    price: '',
    availableQuantity: '',
    category: '',
    prices: [''], // Inicia con un precio de venta vacío
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handlePriceChange = (e, index) => {
    const { value } = e.target;
    const newPrices = [...productData.prices];
    newPrices[index] = value;
    setProductData({
      ...productData,
      prices: newPrices,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envía los datos al servidor utilizando el método POST
    try {
      const response = await axios.post("https://cugusacompany.onrender.com/api/products/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
      } else {
        // Maneja errores de respuesta, por ejemplo, muestra un mensaje de error
      }
    } catch (error) {
      // Maneja errores de red u otros errores
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre del Producto:
        <input
          type="text"
          name="nameProducts"
          value={productData.nameProducts}
          onChange={handleChange}
        />
      </label>
      <label>
        Imagen del Producto:
        <input
          type="text"
          name="imgProduct"
          value={productData.imgProduct}
          onChange={handleChange}
        />
      </label>
      <label>
        Descripción:
        <input
          type="text"
          name="description"
          value={productData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Precio:
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
        />
      </label>
      <label>
        Cantidad Disponible:
        <input
          type="number"
          name="availableQuantity"
          value={productData.availableQuantity}
          onChange={handleChange}
        />
      </label>
      <label>
        Categoría:
        <input
          type="text"
          name="category"
          value={productData.category}
          onChange={handleChange}
        />
      </label>
      {productData.prices.map((price, index) => (
        <label key={index}>
          Precio de Venta #{index + 1}:
          <input
            type="text"
            value={price}
            onChange={(e) => handlePriceChange(e, index)}
          />
        </label>
      ))}
      <button type="button" onClick={() => setProductData({ ...productData, prices: [...productData.prices, ''] })}>
        Agregar Precio de Venta
      </button>
      <button type="submit">Guardar Producto</button>
    </form>
  );
};

export default NewProduct;
