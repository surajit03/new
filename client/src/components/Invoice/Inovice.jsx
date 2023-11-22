import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { toCommas } from "../../utils/utils";
import { initialState } from "../../InitialState";
import moment from "moment";
import "./inovice.css";
import currencies from "../../currencies.json";
import {
  startLoading,
  endLoading,
  getInvoice,
  creatInvoice,
  updateInvoice,
} from "../../redux/invoiceSlice";
import { fetchClientByUser } from "../../redux/client";
import New_coustomer from "../../components/New_coustomer";
import InvoiceType from "./InvoiceType";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Inovice() {
  const location = useLocation();
  const [invoiceData, setInvoiceData] = useState(initialState);
  const [rates, setRates] = useState(0);
  const [vat, setVat] = useState(0);
  const [currency, setCurrency] = useState(currencies[105].value);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [client, setClient] = useState(null);
  const [type, setType] = useState("Inovice");
  const [status, setStatus] = useState("");
  const { _id } = useParams();
  const clients = useSelector((state) => state.client.client);
  const { invoice } = useSelector((state) => state.invoice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customerDetails, setCustomerDetails] = useState(null);

  const handleDateChange = (date) => {
    if (date !== null) {
      const formattedDate = date.toISOString().split("T")[0];
      setSelectedDate(formattedDate);
    }
  };

  useEffect(() => {
    getTotalCount();
  }, [location]);
  const getTotalCount = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token")); // Get the token

      const response = await axios.get(
        `/invoice/getTotalCount/count?searchQuery=${user?.result?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      console.log(response.data);
      //Get total count of invoice from the server and increment by one to serialized numbering of invoice
      setInvoiceData({
        ...invoiceData,
        invoiceNumber: (Number(response.data) + 1).toString().padStart(3, "0"),
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInvoice();
    // }, [_id]);
  }, [location]);

  // const getInvoice = async () => {
  //   const token = JSON.parse(localStorage.getItem("token")); // Get the token
  //   try {
  //     const response = await axios.get(`/invoice/getInvoiceByID/${_id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": token,
  //       },
  //     });
  //     const businessDetails = await api.fetchProfilesByUser({
  //       search: user?.result?._id,
  //     });
  //     const invoiceData = { ...response, businessDetails };
  //     dispatch({ type: getInvoice, payload: invoiceData });
  //     dispatch({ type: getInvoice, payload: response });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    // Define the function inside useEffect to make it an effect
    const fetchCustomers = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.get(
          "/coustomer/fachallcoustomer/", // Adjust the API endpoint to match your actual API
          {}, // Empty request body, as it seems you don't need to send any data
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        setClient(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers(); // Call the function to fetch customers when the component mounts
  }, []);

  const getClientsByUser = async (selectedValue) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (selectedValue) {
      try {
        // Assuming selectedValue is the _id of the selected customer
        const selectedClientId = selectedValue;
        // Now you can use the selectedClientId to make your API request
        const response = await axios.get(
          // `/coustomer/fachallCoustomerByUser?searchQuery=${selectedClientId}`, (wring /coustomer/fachallCoustomerByUser?searchQuery server code )
          `/coustomer/fachallOneCoustomer/${selectedClientId}`,

          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        const data = response.data;
        // dispatch({ type: fetchClientByUser, payload: data });
        console.log(data);
        setCustomerDetails(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Selected value is not defined.");
    }
  };

  useEffect(() => {
    if (invoice) {
      //Automatically set the default invoice values as the ones in the invoice to be updated
      setInvoiceData(invoice);
      setRates(invoice.rates);
      setClient(invoice.client);
      setType(invoice.type);
      setStatus(invoice.status);
      setSelectedDate(invoice.dueDate);
    }
  }, [invoice]);

  useEffect(() => {
    if (type === "Receipt") {
      setStatus("Paid");
    } else {
      setStatus("Unpaid");
    }
  }, [type]);

  const defaultProps = {
    options: currencies,
    getOptionLabel: (option) => option.label,
  };

  const handleRates = (e) => {
    setRates(e.target.value);
    setInvoiceData((prevState) => ({ ...prevState, tax: e.target.value }));
  };

  const handleChange = (index, e) => {
    const values = [...invoiceData.items];
    values[index][e.target.name] = e.target.value;
    setInvoiceData({ ...invoiceData, items: values });
  };

  useEffect(() => {
    const subTotal = () => {
      var arr = document.getElementsByName("amount");
      var subtotal = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].value) {
          subtotal += +arr[i].value;
        }
        setSubTotal(subtotal);
      }
    };

    subTotal();
  }, [invoiceData]);

  useEffect(() => {
    const total = () => {
      const overallSum = (rates / 100) * subTotal + subTotal;
      setVat((rates / 100) * subTotal);
      setTotal(overallSum);
    };
    total();
  }, [invoiceData, rates, subTotal]);

  const handleAddField = (e) => {
    e.preventDefault();
    setInvoiceData((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        { itemName: "", unitPrice: "", quantity: "", discount: "", amount: "" },
      ],
    }));
  };
  const handleRemoveField = (index) => {
    const values = invoiceData.items;
    values.splice(index, 1);
    setInvoiceData((prevState) => ({ ...prevState, values }));
  };

  // console.log(invoiceData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (invoice) {
      const token = JSON.parse(localStorage.getItem("token")); // Get the token
      try {
        const response = await axios.get(
          `/invoice/updateInvoice/${_id}`,
          {
            ...invoiceData,
            subTotal: subTotal,
            total: total,
            vat: vat,
            rates: rates,
            currency: currency,
            dueDate: selectedDate,
            client,
            type: type,
            status: status,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        const data = response.data;
        dispatch({ type: updateInvoice, payload: data });
        console.log(data);
      } catch (error) {
        console.error(error);
        // Handle the error here, for example, by displaying an error message to the user.
      }
      navigate(`/invoice/${invoice._id}`);
    } else {
      // dispatch({ type: startLoading });

      const token = JSON.parse(localStorage.getItem("token")); // Get the token
      try {
        const response = await axios.post(
          "/invoice/createInvoice/",
          {
            ...invoiceData,
            subTotal: subTotal,
            total: total,
            vat: vat,
            rates: rates,
            currency: currency,
            dueDate: selectedDate,
            invoiceNumber: `${
              invoiceData.invoiceNumber < 100
                ? Number(invoiceData.invoiceNumber).toString().padStart(3, "0")
                : Number(invoiceData.invoiceNumber)
            }`,
            client,
            type: type,
            status: status,
            paymentRecords: [],
            creator: [user?.result?._id],
          },
          navigate,
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        const data = response.data;
        // dispatch({ type: creatInvoice, payload: data });
        dispatch(creatInvoice(data));
        console.log(data);
        navigate(`/invoice/${invoice._id}`);
        // dispatch({ type: endLoading });
      } catch (error) {
        console.error(error);
        // Handle the error here, for example, by displaying an error message to the user.
      }
    }

    // setInvoiceData(initialState)
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleDropdown = () => {
    if (clients) {
      setIsOpen(!isOpen);
    }
  };

  const onSelectClient = (client) => {
    onSelectClient(client);
    setIsOpen(false);
  };

  return (
    <div style={{marginLeft:"8px" ,marginTop:"4px" , }}>
      <form onSubmit={handleSubmit} className="mu-form">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {open && (
            <div>
              <New_coustomer />
              <button style={{ margin: "10px" }} onClick={handleClose}>
                Ok
              </button>
            </div>
          )}
        </div>
        <div>
          {/* <div>
            <InvoiceType type={type} setType={setType} />
            Invoice #:
            <div
              style={{
                marginTop: "15px",
                width: "100px",
                padding: "8px",
                display: "inline-block",
                backgroundColor: "#f4f4f4",
                outline: "0px solid transparent",
              }}
              contentEditable="true"
              onInput={(e) =>
                setInvoiceData({
                  ...invoiceData,
                  invoiceNumber: e.currentTarget.textContent,
                })
              }
            >
              <span
                style={{
                  width: "40px",
                  color: "black",
                  padding: "15px",
                }}
                contentEditable="false"
              >
                {" "}
                {invoiceData.invoiceNumber}
              </span>
              <br />
            </div>

            <div
              style={{
                marginTop: "15px",
                width: "100px",
                padding: "8px",
                display: "inline-block",
                backgroundColor: "#f4f4f4",
                outline: "0px solid transparent",
              }}
            >
              <span
                style={{
                  width: "40px",
                  color: "black",
                  padding: "15px",
                }}
              >
                {invoiceData.invoiceNumber}
              </span>
              <br />
              <button
                onClick={(e) => {
                  const newValue = prompt(
                    "Enter a new value for Invoice #:",
                    invoiceData.invoiceNumber
                  );
                  if (newValue !== null) {
                    setInvoiceData({
                      ...invoiceData,
                      invoiceNumber: newValue,
                    });
                  }
                }}
              >
                Edit Invoice #
              </button>
            </div>
          </div> */}

          <div>
            <InvoiceType type={type} setType={setType} />
            {/* Invoice #: */}
            <div
              style={{
                marginTop: "15px",
                width: "100px",
                padding: "8px",
                display: "inline-block",
                backgroundColor: "#f4f4f4",
                outline: "0px solid transparent",
              }}
            >
              <span
                style={{
                  width: "40px",
                  color: "black",
                  padding: "15px",
                }}
              >
                {invoiceData.invoiceNumber}
              </span>
              <br />
              <button
                onClick={(e) => {
                  const newValue = prompt(
                    "Enter a new value for Invoice #:",
                    invoiceData.invoiceNumber
                  );
                  if (newValue !== null) {
                    setInvoiceData({
                      ...invoiceData,
                      invoiceNumber: newValue,
                    });
                  }
                }}
              >
                Invoice No.
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div style={{ marginTop: "40px" }}>
            <div>
              <p>Bill to</p>

              <div>
                <select
                  value={selectedCustomer}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setSelectedCustomer(e.target.value);
                    getClientsByUser(selectedValue);
                  }}
                >
                  <option value="">Select a customer</option>
                  {client &&
                    client.map((client) => (
                      <option key={client._id} value={client._id}>
                        {client.name}
                      </option>
                    ))}
                </select>

                {customerDetails && (
                  <div>
                    <ul>
                      <li style={{ listStyle: "none" }}>
                        {customerDetails.name}
                      </li>
                      <li style={{ listStyle: "none" }}>
                        {customerDetails.village}
                      </li>
                      <li style={{ listStyle: "none" }}>
                        {customerDetails.Email}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              {!client && (
                <>
                  <div style={{ paddingBottom: "10px" }}>
                    <button onClick={handleClickOpen} variant="outlined">
                      New Customer
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div style={{ marginRight: 20, textAlign: "right" }}>
            <p>Status</p>
            <p style={{ color: type === "Receipt" ? "green" : "red" }}>
              {type === "Receipt" ? "Paid" : "Unpaid"}
            </p>
            <p>Date</p>
            <p>{moment().format("MMM Do YYYY")}</p>
            <p>Due Date</p>
            <p>
              {selectedDate
                ? moment(selectedDate).format("MMM Do YYYY")
                : "27th Sep 2021"}
            </p>
            <p>Amount</p>
            <p>
              {currency} {toCommas(total)}
            </p>
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Disc(%)</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((itemField, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      name="itemName"
                      onChange={(e) => handleChange(index, e)}
                      value={itemField.itemName}
                      placeholder="Item name or description"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="quantity"
                      onChange={(e) => handleChange(index, e)}
                      value={itemField.quantity}
                      placeholder="0"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="unitPrice"
                      onChange={(e) => handleChange(index, e)}
                      value={itemField.unitPrice}
                      placeholder="0"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="discount"
                      onChange={(e) => handleChange(index, e)}
                      value={itemField.discount}
                      placeholder="0"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="amount"
                      onChange={(e) => handleChange(index, e)}
                      value={
                        itemField.quantity * itemField.unitPrice -
                        (itemField.quantity *
                          itemField.unitPrice *
                          itemField.discount) /
                          100
                      }
                      disabled
                    />
                  </td>
                  <td>
                    <button onClick={() => handleRemoveField(index)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={handleAddField}>Add Item</button>
          </div>
        </div>
        <div>
          <div>
            <p>Invoice Summary</p>
            <div>
              <p>Sub total:</p>
              <h4>{subTotal}</h4>
            </div>
            <div>
              <p>VAT(%):</p>
              <h4>{vat}</h4>
            </div>
            <div>
              <p>Total</p>
              <h4
                style={{ color: "black", fontSize: "18px", lineHeight: "8px" }}
              >
                {currency} {toCommas(total)}
              </h4>
            </div>
          </div>
          <div>
            <div>
              <input
                type="text"
                step="any"
                name="rates"
                id="rates"
                value={rates}
                onChange={handleRates}
                placeholder="e.g 10"
              />
            </div>
            <div>
              <label>Due date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateChange(new Date(e.target.value))}
              />
            </div>
            <div>
              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
              >
                {currencies.map((currency) => (
                  <option key={currency.countryCode} value={currency.value}>
                    {currency.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h4>Note/Payment Info</h4>
            <textarea
              placeholder="Provide additional details or terms of service"
              onChange={(e) =>
                setInvoiceData({ ...invoiceData, notes: e.target.value })
              }
              value={invoiceData.notes}
            />
          </div>
          <Link to={`/InvoiceDetail/${invoice?._id}`}>
            <button type="submit">Save and Continue</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Inovice;
