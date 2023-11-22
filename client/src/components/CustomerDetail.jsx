import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/CustomerDetail.css'; // Import the CSS file

function CustomerDetail() {
  const { _id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      const token = JSON.parse(localStorage.getItem('token'));

      try {
        const response = await axios.get(
          `/coustomer/fachallOneCoustomer/${_id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'auth-token': token,
            },
          }
        );

        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    fetchCustomer();
  }, [_id]);

  return (
    <div className="customer-detail-container">
      <div className="customer-detail-title">Customer Detail</div>
      {customer ? (
        <div>
          {customer.imgUrl && (
            <div>
              <img
                className="customer-detail-image"
                src={customer.imgUrl}
                alt="Customer"
              />
            </div>
          )}
          <div className="customer-detail-item">
            <span className="customer-detail-label">_id:</span> {customer._id}
          </div>
          <div className="customer-detail-item">
            <span className="customer-detail-label">Name:</span> {customer.name}
          </div>
          <div className="customer-detail-item">
            <span className="customer-detail-label">IdNumber:</span>{' '}
            {customer.IdNumber}
          </div>
          <div className="customer-detail-item">
            <span className="customer-detail-label">PhoneNumber:</span>{' '}
            {customer.PhoneNumber}
          </div>
          <div className="customer-detail-item">
            <span className="customer-detail-label">Village:</span>{' '}
            {customer.village}
          </div>
          <div className="customer-detail-item">
            <span className="customer-detail-label">Email:</span>{' '}
            {customer.Email}
          </div>
          <div className="customer-detail-item">
            <span className="customer-detail-label">Date:</span>{' '}
            {customer.date}
          </div>
        </div>
      ) : (
        <div className="loading-message">Loading...</div>
      )}
    </div>
  );
}

export default CustomerDetail;
