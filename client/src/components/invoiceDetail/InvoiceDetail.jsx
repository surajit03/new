import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initialState } from '../../InitialState';
import { getInvoice } from '../../redux/invoiceSlice';
import { toCommas } from '../../utils/utils';
import styles from './InvoiceDetails.css';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import ProgressButton from 'react-progress-button';
import axios from 'axios';
import { saveAs } from 'file-saver';
import Modal from '../Pamyments/Modal';
import PaymentHistory from './PymentHistory';

const InvoiceDetails = () => {
  const location = useLocation();
  const [invoiceData, setInvoiceData] = useState(initialState);
  const [rates, setRates] = useState(0);
  const [vat, setVat] = useState(0);
  const [currency, setCurrency] = useState('');
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [client, setClient] = useState([]);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [company, setCompany] = useState({});
  const { id } = useParams();
  const { invoice } = useSelector((state) => state.invoices);
  const dispatch = useDispatch();
  const history = useHistory();
  const [sendStatus, setSendStatus] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState(null);
  // eslint-disable-next-line
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(getInvoice(id));
  }, [id, dispatch, location]);

  useEffect(() => {
    if (invoice) {
      // Automatically set the default invoice values as the ones in the invoice to be updated
      setInvoiceData(invoice);
      setRates(invoice.rates);
      setClient(invoice.client);
      setType(invoice.type);
      setStatus(invoice.status);
      setSelectedDate(invoice.dueDate);
      setVat(invoice.vat);
      setCurrency(invoice.currency);
      setSubTotal(invoice.subTotal);
      setTotal(invoice.total);
      setCompany(invoice?.businessDetails?.data?.data);
    }
  }, [invoice]);

  // Get the total amount paid
  let totalAmountReceived = 0;
  for (var i = 0; i < invoice?.paymentRecords?.length; i++) {
    totalAmountReceived += Number(invoice?.paymentRecords[i]?.amountPaid);
  }

  const editInvoice = (id) => {
    history.push(`/edit/invoice/${id}`);
  };

  const createAndDownloadPdf = () => {
    setDownloadStatus('loading');
    axios
      .post(`${process.env.REACT_APP_API}/create-pdf`, {
        name: invoice.client.name,
        address: invoice.client.address,
        phone: invoice.client.phone,
        email: invoice.client.email,
        dueDate: invoice.dueDate,
        date: invoice.createdAt,
        id: invoice.invoiceNumber,
        notes: invoice.notes,
        subTotal: toCommas(invoice.subTotal),
        total: toCommas(invoice.total),
        type: invoice.type,
        vat: invoice.vat,
        items: invoice.items,
        status: invoice.status,
        totalAmountReceived: toCommas(totalAmountReceived),
        balanceDue: toCommas(total - totalAmountReceived),
        company: company,
      })
      .then(() =>
        axios.get(`${process.env.REACT_APP_API}/fetch-pdf`, {
          responseType: 'blob',
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'invoice.pdf');
      })
      .then(() => setDownloadStatus('success'));
  };

  // SEND PDF INVOICE VIA EMAIL
  const sendPdf = (e) => {
    e.preventDefault();
    setSendStatus('loading');
    axios
      .post(`${process.env.REACT_APP_API}/send-pdf`, {
        name: invoice.client.name,
        address: invoice.client.address,
        phone: invoice.client.phone,
        email: invoice.client.email,
        dueDate: invoice.dueDate,
        date: invoice.createdAt,
        id: invoice.invoiceNumber,
        notes: invoice.notes,
        subTotal: toCommas(invoice.subTotal),
        total: toCommas(invoice.total),
        type: invoice.type,
        vat: invoice.vat,
        items: invoice.items,
        status: invoice.status,
        totalAmountReceived: toCommas(totalAmountReceived),
        balanceDue: toCommas(total - totalAmountReceived),
        link: `${process.env.REACT_APP_URL}/invoice/${invoice._id}`,
        company: company,
      })
      .then(() => setSendStatus('success'))
      .catch((error) => {
        console.log(error);
        setSendStatus('error');
      });
  };

  const iconSize = {
    height: '18px',
    width: '18px',
    marginRight: '10px',
    color: 'gray',
  };
  const [open, setOpen] = useState(false);

  function checkStatus() {
    return totalAmountReceived >= total
      ? 'green'
      : status === 'Partial'
      ? '#1976d2'
      : status === 'Paid'
      ? 'green'
      : status === 'Unpaid'
      ? 'red'
      : 'red';
  }

  if (!invoice) {
    return <Spinner />;
  }

  return (
    <div className={styles.PageLayout}>
      {invoice?.creator?.includes(user?.result?._id || user?.result?.googleId) && (
        <div className={styles.buttons}>
          <ProgressButton
            onClick={sendPdf}
            state={sendStatus}
            // onSuccess={() => openSnackbar('Invoice sent successfully')}
          >
            Send to Customer
          </ProgressButton>

          <ProgressButton onClick={createAndDownloadPdf} state={downloadStatus}>
            Download PDF
          </ProgressButton>

          <button className={styles.btn} onClick={() => editInvoice(invoiceData._id)}>
            <BorderColorIcon style={iconSize} />
            Edit Invoice
          </button>

          <button
            // disabled={status === 'Paid' ? true : false}
            className={styles.btn}
            onClick={() => setOpen((prev) => !prev)}
          >
            <MonetizationOnIcon style={iconSize} />
            Record Payment
          </button>
        </div>
      )}

      {invoice?.paymentRecords.length !== 0 && (
        <PaymentHistory paymentRecords={invoiceData?.paymentRecords} />
      )}

      <Modal open={open} setOpen={setOpen} invoice={invoice} />
      <div className={styles.invoiceLayout}>
        <div className={styles.headerContainer}>
          <h2>Header</h2>
          <p>Subtitle</p>
        </div>
        <div className={styles.clientDetails}>
          <div>
            <h4>From</h4>
            <p>Business Name</p>
            <p>Email</p>
            <p>Phone</p>
            <p>Address</p>
          </div>
          <div>
            <h4>Bill to</h4>
            <p>{client.name}</p>
            <p>{client?.email}</p>
            <p>{client?.phone}</p>
            <p>{client?.address}</p>
          </div>
        </div>
        <div className={styles.statusAndSummary}>
          <div>
            <p>Status</p>
            <p>{totalAmountReceived >= total ? 'Paid' : status}</p>
            <p>Date</p>
            <p>{moment().format('MMM Do YYYY')}</p>
            <p>Due Date</p>
            <p>{selectedDate ? moment(selectedDate).format('MMM Do YYYY') : '27th Sep 2021'}</p>
            <p>Amount</p>
            <p>
              {currency} {toCommas(total)}
            </p>
          </div>
        </div>
        <form>
          <div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Disc(%)</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData?.items?.map((itemField, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        name="itemName"
                        value={itemField.itemName}
                        placeholder="Item name or description"
                        readOnly
                      />
                    </td>
                    <td>
                      <input type="number" name="quantity" value={itemField?.quantity} placeholder="0" readOnly />
                    </td>
                    <td>
                      <input type="number" name="unitPrice" value={itemField?.unitPrice} placeholder="0" readOnly />
                    </td>
                    <td>
                      <input type="number" name="discount" value={itemField?.discount} readOnly />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="amount"
                        value={(itemField?.quantity * itemField.unitPrice) - (itemField.quantity * itemField.unitPrice) * itemField.discount / 100}
                        readOnly
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.addButton}></div>
          </div>

          <div className={styles.invoiceSummary}>
            <div className={styles.summary}>Invoice Summary</div>
            <div className={styles.summaryItem}>
              <p>Subtotal:</p>
              <h4>{subTotal}</h4>
            </div>
            <div className={styles.summaryItem}>
              <p>{`VAT(${rates}%):`}</p>
              <h4>{vat}</h4>
            </div>
            <div className={styles.summaryItem}>
              <p>Total</p>
              <h4>
                {currency} {toCommas(total)}
              </h4>
            </div>
            <div className={styles.summaryItem}>
              <p>Paid</p>
              <h4>
                {currency} {toCommas(totalAmountReceived)}
              </h4>
            </div>

            <div className={styles.summaryItem}>
              <p>Balance</p>
              <h4 style={{ color: 'black', fontSize: '18px', lineHeight: '8px' }}>
                {currency} {toCommas(total - totalAmountReceived)}
              </h4>
            </div>
          </div>

          <div className={styles.note}>
            <h4 style={{ marginLeft: '-10px' }}>Note/Payment Info</h4>
            <p style={{ fontSize: '14px' }}>{invoiceData.notes}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceDetails;
