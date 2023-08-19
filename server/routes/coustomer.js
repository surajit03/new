const express = require("express");
const router = express.Router();
const verifyUser = require("../verifyUser")
const AddCoustomern = require("../module/AddCoustomer.js")
const { body, validationResult } = require("express-validator");

// ROUTE 1= add new coustomer using : POST "/api/coustomer/addCoustomer" 

router.post("/addCoustomer", verifyUser,
 [
    body("PhonNumber", "phone number must be 10 number").isLength({ min: 10, max: 10 }),
],
 async (req, res) => {
    try {
        const { imgUrl, name, IdNumber, PhoneNumber, village, Email } = req.body;

        // if the are error return bad requst 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const coustomer = new AddCoustomern({
            imgUrl, 
            name, 
            IdNumber, 
            PhoneNumber, 
            village, 
            Email,
            userId: req.user.id,
        });
        const saveCoustomern =await coustomer.save();
        res.status(200).json(saveCoustomern)
    } catch (error) {
        console.error(error.message);
        res.status(500).send(`Internal server error: ${error.message}`);
    }
}
)

// ROUT 2= get all the note :GET "/api/coustomer/fachallcoustomer"
router.get("/fachallcoustomer", verifyUser, async (req, res) => {
    try {
        const coustomerns = await AddCoustomern.find({ user: req.user.id });
        res.json(coustomerns);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});


module.exports =router;