const jwt = require('jsonwebtoken');
const JWT_SECRET = 'XYZ!@#$ZYX!@#$'


const varUser=(req,res,next)=>{
    // get the user from the jwd token and add id req object

    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).send({error:"Plese authenrion using a valid token"});

    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next()
    } catch (error) {
        res.status(403).send({error:"Token is not valid!"});
    }
};
module.exports =varUser;
