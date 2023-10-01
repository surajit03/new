const mongoose = require('mongoose');
const { Schema } = mongoose;


const InvoiceSchema = new Schema({
    dueDate:Date,
    currency:String,
    items:  { itemName: String, unitPrice: String, quantity: String, discount: String } ,
    rates: String,
    vat: Number,
    total: Number,
    subTotal: Number,
    notes: String,
    status: String,
    invoiceNumber: String,
    type: String,
    creator: [String],
    totalAmountReceived: Number,
    client: { name: String, email: String, phone: String, address: String },
    paymentRecords: [ {amountPaid: Number, datePaid: Date, paymentMethod: String, note: String, paidBy: String } ],
    date: {
        type: Date,
        default: Date.now
    },
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);
module.exports = Invoice;
