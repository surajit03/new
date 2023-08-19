const express = require('express');
const User = require("../module/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'XYZ!@#$ZYX!@#$'

// Route=1 sing up user using post"/singUp"
router.post('/singUp', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {

    let success = false;

    // user input errore 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // find email in data base 
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, errors: "sorry a user with this email alredy exists" })
        }

        // used bcrypt encrept the password
        const salt = await bcrypt.genSalt(10);
        const secPsaa = await bcrypt.hash(req.body.password, salt)

        // create a new user 
        user = await User.create({
            name: req.body.name,
            password: secPsaa,
            email: req.body.email,
        })

        const data = {
            user: {
                id: user.id
            }
        }

        // used jwt token for authentication
        const authToken = jwt.sign(data, JWT_SECRET)

        // used cookie
        res.cookie("access_token", authToken, {
            httpOnly: true,
            secure: true, 
            sameSite: 'strict'

        })
        let success = true
        res.json({ success, authToken })
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }

});

// Route=2 sing in user using post"/singIn"

router.post('/singIn', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 8 characters').isLength({ min: 8 }),

], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            let success = false;
            return res.status(400).json({ success, error: "please try to login with correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        // used jwt token for authentication
        const authToken = jwt.sign(data, JWT_SECRET)

        // used cookie
        res.cookie("access_token", authToken, {
            httpOnly: true,
            secure: true, 
            sameSite: 'strict'

        })
        let success = true
        res.json({ success, authToken })
        
    } catch (error) {
        console.log(error.massage);
        res.status(500).send("Internal server error")
    }
})

module.exports = router;