const express = require("express");
const router = express.Router();
const verifyUser = require("../verifyUser")
const Product = require("../module/Products.js")
const { body, validationResult } = require("express-validator");

// Add new product using :POST "/api/product/addProduct" 

router.post("/addProduct", verifyUser, async (req, res) => {
    try {
        const { imgUrl, name, price, description, categary,uniqueId} = req.body;

        // if the are error return bad requst
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return req.status(400).json({ errors: errors() });
        }

        const products = new Product({
            imgUrl, 
            name, 
            price, 
            description, 
            categary,
            uniqueId,
        });
        const saveProduct =await products.save();
        res.status(200).json(saveProduct)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// get all product using : GET "/api/product/fachallproduct"
router.get("/fachallproduct",verifyUser ,async (req,res)=>{
    try {
        const product = await Product.find(req.params.id);
        console.log("Product ",product);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

// get one product using :GEt "/api/product/fachaOneProduct"
router.get("/fachaOneProduct/:_id",verifyUser ,async (req,res)=>{
    try {
        const product = await Product.findById(req.params._id);
        if (!product) {
            return res.status(404).json({ message: 'Customer not found' });
          }
       
          res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})


module.exports =router;
