import React, { useState, useEffect } from 'react';
import '../css/ProductList.css'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('http://localhost:4000/getProducts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        // Handle error here, e.g., show an error message to the user
      });
  };



    // Get the existing products data from localStorage
//     const storedProducts = JSON.parse(localStorage.getItem('products')) || fakeAPIResponse;

//     setProducts(storedProducts);
//   }, []);

  const handleInputChange = (event, productId, field) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, [field]: event.target.value }
        : product
    );

    setProducts(updatedProducts);
  };

  const handleSaveChanges = async (productId) => {
    // Find the product that matches the given productId
    const updatedProduct = products.find((product) => product.id === productId);
    console.log(updatedProduct)
    // Call the PUT API to update the product
    try {
      const response = await fetch(`http://localhost:4000/editProduct/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
  
      if (response.ok) {
        console.log(`Product with ID ${productId} updated successfully`);
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product: ', error);
    }
  
    // Update the state to reflect the changes
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? updatedProduct : product
      )
    );
  };
  

  return (
    <div className='product-list-container mt-5'>
  <h2 className='text-center'>Product List</h2>
  <ul className='product-list'>
    {products.map((product) => (
      <li key={product.id} className='product-item'>
        <input
          className='product-input'
          type="text"
          value={product.productName}
          onChange={(event) => handleInputChange(event, product.id, 'productName')}
        />
        
        <input
          className='product-input'
          type="number"
          value={product.price}
          onChange={(event) => handleInputChange(event, product.id, 'price')}
        />
        
        <input
          className='product-input'
          type="text"
          value={product.brand}
          onChange={(event) => handleInputChange(event, product.id, 'brand')}
        />
        
        <input
          className='product-input'
          type="number"
          value={product.quantity}
          onChange={(event) => handleInputChange(event, product.id, 'quantity')}
        />
        <input
          className='product-input'
          type="text"
          value={product.image}
          onChange={(event) => handleInputChange(event, product.id, 'image')}
        />
        
        <button className="save-button" onClick={() => handleSaveChanges(product.id)}>Save</button>
      </li>
    ))}
  </ul>
</div>

  );
};

export default ProductList;

