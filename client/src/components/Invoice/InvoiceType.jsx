import React, { useState } from 'react';

const InvoiceType = ({ type, setType }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div>
      {/* <div style={{ marginBottom: '-1px', paddingTop: '10px', color: 'gray' }}>Select type</div> */}
      <button style={{ lineSpacing: 1, fontSize: 35, fontWeight: 700 }} onClick={handleClickOpen}>{type? type : 'Invoice'}</button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {open && (
          <div>
            <select
              style={{ margin: '10px' }}
              value={type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Invoice">Invoice</option>
              <option value="Receipt">Receipt</option>
              <option value="Estimate">Estimate</option>
              <option value="Bill">Bill</option>
              <option value="Quotation">Quotation</option>
            </select>
            {/* <button style={{ margin: '10px' }} onClick={handleClose}>Cancel</button> */}
            <button style={{ margin: '10px' }} onClick={handleClose}>Ok</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceType;
