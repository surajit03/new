import React from 'react'
import "../css/New_coustomer.css"

function New_coustomer() {
  return (
    <div className='New_coustomer'>
      <div className='hading'>Customer Detal</div>
      <div className='customer_detal'>
        <div className='Cimg'>img</div>
        <div className='Cdetal'>
          <div className='CD'>Name -</div>
          <div className='CD'>ID Number -</div>
          <div className='CD'>Phone Number -</div>
          <div className='CD'>Village -</div>
          <div className='CEmail'>Email -</div>
        </div>
      </div>
      <div className='transaction'>All transation</div>
    </div>
  )
}

export default New_coustomer
