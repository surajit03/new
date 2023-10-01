import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { _id } = useParams(); // Use useParams to access the _id parameter
  const [product, SetProduct] = useState(null);
  

  useEffect(() => {
    const fetchProduct = async () => {
      const token = JSON.parse(localStorage.getItem('token'));

      try {
        const response = await axios.get(
          `/product/fachaOneProduct/${_id}`, 
          {
            headers: {
              'Content-Type': 'application/json',
              'auth-token': token,
            },
          }
        );

        SetProduct(response.data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    fetchProduct();
  }, [_id]); 
  return (
    <div>
      <div>Product Detail</div>
      {product ? (
        <div>
            {product.imgUrl && (
            <div>
              <img src={product.imgUrl} alt="product" />
            </div>
          )}
          <div>_id: {product._id}</div>
          <div>Name: {product.name}</div>
          <div>price: {product.price}</div>
          <div>description: {product.description}</div>
          <div>categary: {product.categary}</div>
          <div>uniqueId: {product.uniqueId}</div>
          <div>date: {product.date}</div>
        

        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
export default ProductDetail
