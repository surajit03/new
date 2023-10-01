const express = require("express");
const router = express.Router();
const verifyUser = require("../verifyUser.js")
const Invoice = require("../module/invoice.js")
const { body, validationResult } = require("express-validator");



// Creat invoice using :POST "/api/invoice/createInvoice" 

router.post("/createInvoice", verifyUser, async (req, res) => {
    try {
        const invoice = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return req.status(400).json({ errors: errors() });
        }
        const newInvoice = new Invoice(invoice)

        const saveInvoice = await newInvoice.save();
        res.status(200).json(saveInvoice)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});
// get invoice by id using :GEt "/api/invoice/getInvoiceByID/_id"
router.get("/getInvoiceByID/:_id", verifyUser, async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params._id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice is not found' });
        }

        res.status(200).json(invoice);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})


// get invoice by User using :GEt "/api/invoice/getInvoiceByID"
router.get("/getInvoicesByUser", verifyUser, async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const invoices = await Invoice.findById({ creator: searchQuery });
        if (!invoices) {
            return res.status(404).json({ message: 'Invoice is not found' });
        }
        res.status(200).json({ data: invoices });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})


// get invoice by count using :GEt "/api/invoice/getTotalCount/count"
router.get("/getTotalCount/count", verifyUser, async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const totalCount = await Invoice.countDocuments({ creator: searchQuery });
        res.status(200).json({ data: totalCount });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})


// update invoice by using :patch "/api/invoice/updateInvoice/_id"
router.patch("/updateInvoice/_id", verifyUser, async (req, res) => {
    const { id: _id } = req.params
    const invoice = req.body
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No invoice with that id')

        const updatedInvoice = await Invoice.findByIdAndUpdate(_id, { ...invoice, _id }, { new: true })
        res.json(updatedInvoice)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

// delete invoice by using :delete "/api/invoice/deleteInvoice/_id"
router.delete("/deleteInvoice/_id", verifyUser, async (req, res) => {
    const { _id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No invoice with that id')

        await Invoice.findByIdAndRemove(id)
        res.json({ message: 'Invoice deleted successfully' })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports =router;

