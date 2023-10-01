const express = require("express");
const router = express.Router();
const verifyUser = require("../verifyUser")
const Coustomer = require("../module/AddCoustomer.js")
const { body, validationResult } = require("express-validator");

// ROUTE 1= add new coustomer using : POST "/api/coustomer/addCoustomer" 

router.post("/addCoustomer", verifyUser,[
    body('PhoneNumber', 'Enter a val_id Phone Number').isLength({ min: 3 }),
] ,async (req, res) => {
    try {
        const { imgUrl, name, IdNumber, PhoneNumber, village, Email } = req.body;

        // // if the are error return bad requst 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const coustomer = new Coustomer({
            imgUrl, 
            name, 
            IdNumber, 
            PhoneNumber, 
            village, 
            Email,

        });
        const saveCoustomern =await coustomer.save();
        res.status(200).json(saveCoustomern)
    } catch (error) {
        console.error(error.message);

        res.status(500).send("Internal server error");
    }
}
)

// ROUT 2= get all the coustomer :GET "/api/coustomer/fachallcoustomer"
router.get("/fachallcoustomer", verifyUser, async (req, res) => {
    try {
        const coustomer = await Coustomer.find( req.params._id );
        // console.log("Customer data:", coustomer);
        res.status(200).json(coustomer);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});

// ROUT 3=get 1 coustomer GET "/api/coustomer/fachallOnecoustomer/:_id"
router.get('/fachallOneCoustomer/:_id', verifyUser, async (req, res) => {
    try {
      const customer = await Coustomer.findById(req.params._id);
  
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
   
      res.status(200).json(customer);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal server error');
    }
  });


module.exports =router;