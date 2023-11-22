const express = require("express");
const router = express.Router();
const verifyUser = require("../verifyUser")
const Profile = require("../module/Profile.js")
const { body, validationResult } = require("express-validator");


// Create profile using :POST "/api/profile/createProfile" 
router.post("/createProfile", verifyUser, async (req, res) => {
    try {
        const {name,email,businessName,phoneNumber,contactAddress,imgUrl,userId} = req.body;

        // if the are error return bad requst
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return req.status(400).json({ errors: errors() });
        // }

        const NewProfile = new Profile({
            name,email,businessName,phoneNumber,contactAddress,imgUrl,userId
        });
        const existingUser = await Profile.findOne({ email })

        if(existingUser) return res.status(404).json({ message: "Profile already exist" })
          await NewProfile.save();
    
          res.status(201).json(NewProfile );
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});


// get profile by id  using : GET "/api/profile/getProfile/:_id"
router.get("/getProfile/:_id",verifyUser ,async (req,res)=>{
  const { _id } = req.params;
    try {
        const profile = await Profile.findById(_id);
        res.status(200).json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

router.get("/OnegetProfile",verifyUser ,async (req,res)=>{
    try {
      const profile = await Profile.find( req.params._id );
        res.status(200).json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

// get profile by user  using : GET "/api/profile/getProfile/:_id"
router.get("/getProfilesByUser",verifyUser ,async (req,res)=>{
  const { searchQuery } = req.query;

    try {
      const profile = await ProfileModel.findOne({ userId: searchQuery });
      res.json({ data: profile });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

// update profile using : path "/api/profile/updateProfile/:_id"
router.get("/updateProfile/:_id",verifyUser ,async (req,res)=>{
    const {id: _id } = req.params;
    const profile = req.body

      try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No client with that id')
        const updatedProfile = await Profile.findByIdAndUpdate(_id, {...profile, _id}, { new: true})
        res.json(updatedProfile)

      } catch (error) {
          console.log(error.message);
          res.status(500).send("Internal server error");
      }
  })


  // delete  profile using : delete "/api/profile/deleteProfile/:_id"
router.get("/deleteProfile/:_id",verifyUser ,async (req,res)=>{
    const { _id } = req.params;

      try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No client with that id');
        await Profile.findByIdAndRemove(_id);

      } catch (error) {
          console.log(error.message);
          res.status(500).send("Internal server error");
      }
  })

module.exports = router;