// import React from "react";
// import "../css/Sell.css";
// import New from "../img/new.png";


// function Sell() {
//   return (
//     <div className="sell">
//       <div className="invoice">New Retainer invoice</div>
//       <div className="Invoice_detal">
//         <div className="customer_detal">
//           <div className="CName">
//             Customer Name
//             <input
//               className=" searchInput"
//               id="searchStr"
//               placeholder="Search"
//             ></input>
//           </div>
//           <div className="Cid">
//             Customer ID.
//             <input
//               className=" searchInput"
//               id="searchStr"
//               placeholder="Search"
//             ></input>
//           </div>
//           <div className="CAdd"></div>
//         </div>
//         <div className="invoice_detal">
//           <div className="Inumber">
//             Invoice Number 
//             {/* todo */}
//           </div>
//           <div className="Idate">
//             Invoice Date
//             {/* todo */}
//           </div>
//         </div>
//         <div className="Items">
//           <div className="Item_detal">Items Details</div>
//           <div className="quantity">Quantity</div>
//           <div className="rate">Rate</div>
//           <div className="discount">Discount</div>
//         </div>
//         <div className="price_detal">
//           <div className="img">img</div>
//           <div className="total_item">
//           <input
//               className=" searchInput"
//               id="searchStr"
//               placeholder="Search"
//             ></input>
//           </div>
//           <div className="total_quntity">
//           <input
//               className=" SmallsearchInput"
//               id="SmallsearchStr"
//             ></input>
//           </div>
//           <div className="One_rate">
//             {/* todo */}
//           </div>
//           <div className="Discount">
//             {/* todo */}
//           </div>
//         </div>
//         <button className="new">
//           <img className="New" src={New} alt="New" />
//           <div className="Add_items">Add another items</div>
//         </button>
//         <div className="Total_div">
//           <div className="sub_total">Sub Total</div>
//           <div className="Adjustment">Adjustment 
//           <input
//               className=" SmallsearchInput"
//               id="SmallsearchStr"
//             ></input> 
//           </div>
//           <div className="total">Total</div>
//         </div>
//         <div className="Payment_options">Payment Options 
//         <button>
//           p
//         </button>
//         </div>
//       </div>
//     </div>


//   );
// }

// export default Sell;






// /h-------------------------------


// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { toCommas } from "../../utils/utils";
// import { initialState } from "../../InitialState";
// import moment from "moment";
// import "./inovice.css";
// import currencies from "../../currencies.json";
// import {
//   startLoading,
//   endLoading,
//   getInvoice,
//   creatInvoice,
//   updateInvoice,
// } from "../../redux/invoiceSlice";
// import { fetchClientByUser } from "../../redux/client";
// import New_coustomer from "../../components/New_coustomer";
// import InvoiceType from "./InvoiceType";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// function Inovice() {
//   const location = useLocation();
//   const [invoiceData, setInvoiceData] = useState(initialState);
//   const [rates, setRates] = useState(0);
//   const [vat, setVat] = useState(0);
//   const [currency, setCurrency] = useState(currencies[0].value);
//   const [subTotal, setSubTotal] = useState(0);
//   const [total, setTotal] = useState(0);
//   const today = new Date();
//   const [selectedDate, setSelectedDate] = useState(
//     today.getTime() + 7 * 24 * 60 * 60 * 1000
//   );
//   const [client, setClient] = useState(null);
//   const [type, setType] = useState("Inovice");
//   const [status, setStatus] = useState("");
//   const { _id } = useParams();
//   const Customer = useSelector((state) => state.client.client);
//   const { invoice } = useSelector((state) => state.invoice);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("profile"));

//   useEffect(() => {
//     getTotalCount();
//   }, [location]);

//   const getTotalCount = async () => {
//     try {
//       const token = JSON.parse(localStorage.getItem("token")); // Get the token

//       const response = await axios.get(
//         `/invoice/getTotalCount/count?searchQuery=${user?.result?._id}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "auth-token": token,
//           },
//         }
//       );
//       console.log(response.data);
//       //Get total count of invoice from the server and increment by one to serialized numbering of invoice
//       setInvoiceData({
//         ...invoiceData,
//         invoiceNumber: (Number(response.data) + 1).toString().padStart(3, "0"),
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getInvoice();
//   }, [_id]);

//   const getInvoice = async () => {
//     const token = JSON.parse(localStorage.getItem("token")); // Get the token
//     try {
//       const response = await axios.get(`/invoice/getInvoiceByID/${_id}`, {
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": token,
//         },
//       });
//       // const businessDetails = await api.fetchProfilesByUser({
//       //   search: user?.result?._id,
//       // });
//       // const invoiceData = { ...response, businessDetails };
//       // dispatch({ type: getInvoice, payload: invoiceData });
//       dispatch({ type: getInvoice, payload: response });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getClientsByUser();
//   }, [_id]);

//   const getClientsByUser = async () => {
//     const token = JSON.parse(localStorage.getItem("token")); // Get the token
//     try {
//       const response = await axios.get(
//         `/coustomer/getInvoicesByUser?searchQuery=${user.result._id}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "auth-token": token,
//           },
//         }
//       );
//       const data = response.data;

//       dispatch({ type: fetchClientByUser, payload: data });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (invoice) {
//       //Automatically set the default invoice values as the ones in the invoice to be updated
//       setInvoiceData(invoice);
//       setRates(invoice.rates);
//       setClient(invoice.client);
//       setType(invoice.type);
//       setStatus(invoice.status);
//       setSelectedDate(invoice.dueDate);
//     }
//   }, [invoice]);

//   useEffect(() => {
//     if (type === "Receipt") {
//       setStatus("Paid");
//     } else {
//       setStatus("Unpaid");
//     }
//   }, [type]);

//   const defaultProps = {
//     options: currencies,
//     getOptionLabel: (option) => option.label,
//   };

//   const clientsProps = {
//     options: Customer,
//     getOptionLabel: (option) => option.name,
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleRates = (e) => {
//     setRates(e.target.value);
//     setInvoiceData((prevState) => ({ ...prevState, tax: e.target.value }));
//   };

//   const handleChange = (index, e) => {
//     const values = [...invoiceData.items];
//     values[index][e.target.name] = e.target.value;
//     setInvoiceData({ ...invoiceData, items: values });
//   };

//   useEffect(() => {
//     const subTotal = () => {
//       var arr = document.getElementsByName("amount");
//       var subtotal = 0;
//       for (var i = 0; i < arr.length; i++) {
//         if (arr[i].value) {
//           subtotal += +arr[i].value;
//         }
//         setSubTotal(subtotal);
//       }
//     };

//     subTotal();
//   }, [invoiceData]);

//   useEffect(() => {
//     const total = () => {
//       const overallSum = (rates / 100) * subTotal + subTotal;
//       setVat((rates / 100) * subTotal);
//       setTotal(overallSum);
//     };
//     total();
//   }, [invoiceData, rates, subTotal]);

//   const handleAddField = (e) => {
//     e.preventDefault();
//     setInvoiceData((prevState) => ({
//       ...prevState,
//       items: [
//         ...prevState.items,
//         { itemName: "", unitPrice: "", quantity: "", discount: "", amount: "" },
//       ],
//     }));
//   };
//   const handleRemoveField = (index) => {
//     const values = invoiceData.items;
//     values.splice(index, 1);
//     setInvoiceData((prevState) => ({ ...prevState, values }));
//   };

//   console.log(invoiceData);

//   console.log(invoiceData);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (invoice) {
//       const token = JSON.parse(localStorage.getItem("token")); // Get the token
//       try {
//         const response = await axios.get(
//           `/invoice/updateInvoice/${_id}`,
//           {
//             ...invoiceData,
//             subTotal: subTotal,
//             total: total,
//             vat: vat,
//             rates: rates,
//             currency: currency,
//             dueDate: selectedDate,
//             client,
//             type: type,
//             status: status,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "auth-token": token,
//             },
//           }
//         );
//         const data = response.data;
//         dispatch({ type: updateInvoice, payload: data });
//       } catch (error) {
//         console.error(error);
//         // Handle the error here, for example, by displaying an error message to the user.
//       }
//       navigate(`/invoice/${invoice._id}`);
//     } else {
//       dispatch({ type: startLoading });

//       const token = JSON.parse(localStorage.getItem("token")); // Get the token
//       try {
//         const response = await axios.get(
//           "/invoice/createInvoice/",
//           {
//             ...invoiceData,
//             subTotal: subTotal,
//             total: total,
//             vat: vat,
//             rates: rates,
//             currency: currency,
//             dueDate: selectedDate,
//             invoiceNumber: `${
//               invoiceData.invoiceNumber < 100
//                 ? Number(invoiceData.invoiceNumber).toString().padStart(3, "0")
//                 : Number(invoiceData.invoiceNumber)
//             }`,
//             client,
//             type: type,
//             status: status,
//             paymentRecords: [],
//             creator: [user?.result?._id],
//           },
//           navigate,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "auth-token": token,
//             },
//           }
//         );
//         const data = response.data;
//         dispatch({ type: creatInvoice, payload: data });
//         navigate(`/invoice/${invoice._id}`);
//         dispatch({ type: endLoading });
//       } catch (error) {
//         console.error(error);
//         // Handle the error here, for example, by displaying an error message to the user.
//       }
//     }

//     // setInvoiceData(initialState)
//   };
//   const [open, setOpen] = useState(false);
//   let menuRef = useRef();
//   const handleOutsideClick = (e) => {
//     console.log("Clicked outside");
//     if (!menuRef.current.contains(e.target)) {
//       setOpen(false);
//     }
//   };
//   useEffect(() => {
//     document.addEventListener("mousedown", handleOutsideClick);

//     // Cleanup the event listener when the component unmounts
//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, []);

//   // const CustomPaper = (props) => {
//   //   return <Paper elevation={3} {...props} />;
//   // };
//   return (
//     <div>
//       <form onSubmit={handleSubmit} className="mu-form">
//         <div ref={menuRef}>
//           <button
//             onClick={() => {
//               setOpen(!open);
//             }}
//           >
//             add
//           </button>
//           <New_coustomer
//             setOpen={setOpen}
//             open={open}
//             className={`dropdown-menu ${open ? "active" : "inactive"}`}
//           />
//         </div>
//         <div>
//           <div>
//             <InvoiceType type={type} setType={setType} />
//             Invoice #:
//             <div
//               style={{
//                 marginTop: "15px",
//                 width: "100px",
//                 padding: "8px",
//                 display: "inline-block",
//                 backgroundColor: "#f4f4f4",
//                 outline: "0px solid transparent",
//               }}
//               contentEditable="true"
//               onInput={(e) =>
//                 setInvoiceData({
//                   ...invoiceData,
//                   invoiceNumber: e.currentTarget.textContent,
//                 })
//               }
//             >
//               <span
//                 style={{
//                   width: "40px",
//                   color: "black",
//                   padding: "15px",
//                 }}
//                 contentEditable="false"
//               >
//                 {" "}
//                 {invoiceData.invoiceNumber}
//               </span>
//               <br />
//             </div>
//           </div>
//         </div>
//         <hr />
//         <div>
//           <div style={{ marginTop: "40px" }}>
//             <div>
//               <p>Bill to</p>
//               {client && (
//                 <>
//                   <p>{client.name}</p>
//                   <p>{client.email}</p>
//                   <p>{client.phone}</p>
//                   <p>{client.address}</p>
//                   <button
//                     color="primary"
//                     size="small"
//                     style={{ textTransform: "none" }}
//                     onClick={() => setClient(null)}
//                   >
//                     Change
//                   </button>
//                 </>
//               )}
//               <div style={client ? { display: "none" } : { display: "block" }}>
//                 <select
//                   required={!invoice && true}
//                   value={client ? client.name : ""}
//                   onChange={(event, value) => setClient(value)}
//                 >
//                   {Customer &&
//                     Customer.map((client) => (
//                       <option key={client._id} value={client.name}>
//                         {client.name}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//               {!client && (
//                 <>
//                   <div style={{ paddingBottom: "10px" }}>
//                     <button
//                       onClick={() => setOpen(true)}
//                       variant="outlined"
//                     >
//                       New Customer
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//           <div style={{ marginRight: 20, textAlign: "right" }}>
//             <p>Status</p>
//             <p style={{ color: type === "Receipt" ? "green" : "red" }}>
//               {type === "Receipt" ? "Paid" : "Unpaid"}
//             </p>
//             <p>Date</p>
//             <p>{moment().format("MMM Do YYYY")}</p>
//             <p>Due Date</p>
//             <p>
//               {selectedDate
//                 ? moment(selectedDate).format("MMM Do YYYY")
//                 : "27th Sep 2021"}
//             </p>
//             <p>Amount</p>
//             <p>
//               {currency} {toCommas(total)}
//             </p>
//           </div>
//         </div>
//         <div>
//           <table>
//             <thead>
//               <tr>
//                 <th>Item</th>
//                 <th>Qty</th>
//                 <th>Price</th>
//                 <th>Disc(%)</th>
//                 <th>Amount</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {invoiceData.items.map((itemField, index) => (
//                 <tr key={index}>
//                   <td>
//                     <input
//                       type="text"
//                       name="itemName"
//                       onChange={(e) => handleChange(index, e)}
//                       value={itemField.itemName}
//                       placeholder="Item name or description"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       name="quantity"
//                       onChange={(e) => handleChange(index, e)}
//                       value={itemField.quantity}
//                       placeholder="0"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       name="unitPrice"
//                       onChange={(e) => handleChange(index, e)}
//                       value={itemField.unitPrice}
//                       placeholder="0"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       name="discount"
//                       onChange={(e) => handleChange(index, e)}
//                       value={itemField.discount}
//                       placeholder="0"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       name="amount"
//                       onChange={(e) => handleChange(index, e)}
//                       value={
//                         itemField.quantity * itemField.unitPrice -
//                         (itemField.quantity *
//                           itemField.unitPrice *
//                           itemField.discount) /
//                           100
//                       }
//                       disabled
//                     />
//                   </td>
//                   <td>
//                     <button onClick={() => handleRemoveField(index)}>
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div>
//             <button onClick={handleAddField}>Add Item</button>
//           </div>
//         </div>
//         <div>
//           <div>
//             <p>Invoice Summary</p>
//             <div>
//               <p>Sub total:</p>
//               <h4>{subTotal}</h4>
//             </div>
//             <div>
//               <p>VAT(%):</p>
//               <h4>{vat}</h4>
//             </div>
//             <div>
//               <p>Total</p>
//               <h4
//                 style={{ color: "black", fontSize: "18px", lineHeight: "8px" }}
//               >
//                 {currency} {toCommas(total)}
//               </h4>
//             </div>
//           </div>
//           <div>
//             <div>
//               <input
//                 type="text"
//                 step="any"
//                 name="rates"
//                 id="rates"
//                 value={rates}
//                 onChange={handleRates}
//                 placeholder="e.g 10"
//               />
//             </div>
//             <div>
//               <label>Due date</label>
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => handleDateChange(new Date(e.target.value))}
//               />
//             </div>
//             <div>
//               <select
//                 value={currency.value}
//                 onChange={(event, value) => setCurrency(value.value)}
//               >
//                 {currencies.map((currency) => (
//                   <option key={currency.value} value={currency.value}>
//                     {currency.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//         <div>
//           <div>
//             <h4>Note/Payment Info</h4>
//             <textarea
//               placeholder="Provide additional details or terms of service"
//               onChange={(e) =>
//                 setInvoiceData({ ...invoiceData, notes: e.target.value })
//               }
//               value={invoiceData.notes}
//             />
//           </div>
//           <button type="submit">Save and Continue</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Inovice;
