import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/ProductDetail.css"; // Import the CSS file

function ProductDetail() {
  const { _id } = useParams(); // Use useParams to access the _id parameter
  const [product, SetProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = JSON.parse(localStorage.getItem("token"));

      try {
        const response = await axios.get(`/product/fachaOneProduct/${_id}`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        SetProduct(response.data);
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    fetchProduct();
  }, [_id]);
  return (
    <div className="product-detail-container">
      <div  className="product-detail-title">Product Detail</div>
      {product ? (
        <div>
          {product.imgUrl && (
            <div>
              <img
                className="product-detail-image"
                src={product.imgUrl}
                alt="product"
              />
            </div>
          )}
          <div className="product-detail-item">
            <span className="product-detail-label">_id: {product._id}</span>
          </div>
          <div className="product-detail-item">
            <span className="product-detail-label">Name: {product.name}</span>
          </div>
          <div className="product-detail-item">
            <span className="product-detail-label">
              price: {product.price}
            </span>
          </div>
          <div className="product-detail-item">
            <span className="product-detail-label">
              description: {product.description}
            </span>
          </div>
          <div className="product-detail-item">
            <span className="product-detail-label">
              categary: {product.categary}
            </span>
          </div>
          <div className="product-detail-item">
            <span className="product-detail-label">
              uniqueId: {product.uniqueId}
            </span>
          </div>
          <div className="product-detail-item">
            <span className="product-detail-label">date: {product.date}</span>
          </div>
        </div>
      ) : (
        <div className="loading-message">Loading...</div>

      )}
    </div>
  );
}
export default ProductDetail;
