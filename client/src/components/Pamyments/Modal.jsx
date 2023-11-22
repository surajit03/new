import React, { useState, useEffect } from "react";
import "./Modal.css";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "./DatePicker";
import { updateInvoice } from "../../redux/invoiceSlice";
import { navigate } from "react-router-dom";


const  Dialog=({ title, open, onClose, children })=> {
    return (
      <div className={`dialog ${open ? 'open' : ''}`}>
        <div className="dialog-content">
          <div className="dialog-header">
            <h2>{title}</h2>
            <span className="close-button" onClick={onClose}>&times;</span>
          </div>
          {children}
        </div>
      </div>
    );
  }
  


const Modal = ({ setOpen, open, invoice }) => {
  const dispatch = useDispatch();

  const [payment, setPayment] = useState({
    amountPaid: 0,
    datePaid: new Date(),
    paymentMethod: "",
    note: "",
    paidBy: "",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [paymentRecords, setPaymentRecords] = useState([]);
  const [method, setMethod] = useState("");
  const [totalAmountReceived, setTotalAmountReceived] = useState(0);
  const [updatedInvoice, setUpdatedInvoice] = useState({});

  const paymentMethods = [
    "Bank Transfer",
    "Cash",
    "Credit Card",
    "PayPal",
    "Others",
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //   const handleSubmitPayment = (e) => {
  //     e.preventDefault();

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    if (invoice) {
      const token = JSON.parse(localStorage.getItem("token")); // Get the token
      try {
        const response = await axios.get(
          `/invoice/updateInvoice/${_id}`,
          updatedInvoice,
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        const data = response.data;
        dispatch({ type: updateInvoice, payload: data });
        handleClose();
        navigate('/Dashboard');
      } catch (error) {
        console.error(error);
        // Handle the error here, for example, by displaying an error message to the user.
      }
    }
  };

  const clear = () => {};

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setPayment({ ...payment, paymentMethod: method });
  }, [method]);

  useEffect(() => {
    setPayment({ ...payment, datePaid: selectedDate });
  }, [selectedDate]);

  useEffect(() => {
    if (invoice) {
      setPayment({
        ...payment,
        amountPaid: Number(invoice.total) - Number(invoice.totalAmountReceived),
        paidBy: invoice?.client?.name,
      });
    }
  }, [invoice]);

  useEffect(() => {
    if (invoice?.paymentRecords) {
      setPaymentRecords(invoice?.paymentRecords);
    }
  }, [invoice]);

  useEffect(() => {
    let totalReceived = 0;
    for (var i = 0; i < invoice?.paymentRecords?.length; i++) {
      totalReceived += Number(invoice?.paymentRecords[i]?.amountPaid);
    }
    setTotalAmountReceived(totalReceived);
  }, [invoice, payment]);

  useEffect(() => {
    setUpdatedInvoice({
      ...invoice,
      status:
        Number(totalAmountReceived) + Number(payment.amountPaid) >=
        invoice?.total
          ? "Paid"
          : "Partial",
      paymentRecords: [...paymentRecords, payment],
      totalAmountReceived:
        Number(totalAmountReceived) + Number(payment.amountPaid),
    });
  }, [payment, paymentRecords, totalAmountReceived, invoice]);


//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const openDialog = () => {
//     setIsDialogOpen(true);
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//   };


  return (
    <div className={`modal ${open ? "open" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
        {/* <Dialog title="Dialog Title" open={isDialogOpen} onClose={closeDialog}> */}
          <h2>Record Payment</h2>
          {/* </Dialog> */}
          <span className="close" onClick={handleClose}>
            &times;
          </span>
        </div>
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div className="modal-body">
          <input
            type="number"
            name="amountPaid"
            placeholder="Amount Paid"
            onChange={(e) =>
              setPayment({ ...payment, amountPaid: e.target.value })
            }
            value={payment.amountPaid}
          />

          <input
            type="date"
            name="datePaid"
            value={selectedDate.toISOString().slice(0, 10)}
            onChange={(e) => handleDateChange(new Date(e.target.value))}
          />
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="">Payment Method</option>
            {paymentMethods.map((method, index) => (
              <option key={index} value={method}>
                {method}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="note"
            placeholder="Note"
            onChange={(e) => setPayment({ ...payment, note: e.target.value })}
            value={payment.note}
          />
        </div>
        <div className="modal-footer">
          <button onClick={handleSubmitPayment} className="save-button">
            Save Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
