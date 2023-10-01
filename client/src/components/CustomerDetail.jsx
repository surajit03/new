import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CustomerDetail() {
  const { _id } = useParams(); // Use useParams to access the _id parameter
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
    <div>
      <div>Customer Detail</div>
      {customer ? (
        <div>
           {customer.imgUrl && (
            <div>
              <img src={customer.imgUrl} alt="Customer" />
            </div>
          )}
          <div>_id: {customer._id}</div>
          <div>Name: {customer.name}</div>
          <div>IdNumber: {customer.IdNumber}</div>
          <div>PhoneNumber: {customer.PhoneNumber}</div>
          <div>village: {customer.village}</div>
          <div>Email: {customer.Email}</div>
          <div>date: {customer.date}</div>
         

        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default CustomerDetail;
