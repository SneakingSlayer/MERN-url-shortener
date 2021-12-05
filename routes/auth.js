const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User')



router.post('/signin', async (req,res) => {
    console.log(req.body)
    const checkEmail = await User.findOne({email: req.body.email});
    if(!checkEmail) 
        return res.status(400).json({msg: "Incorrect Email or Password"});
    const checkPass = await bcrypt.compare(req.body.password, checkEmail.password);
    if(!checkPass) 
        return res.status(400).json({msg: "Incorrect Email or Password"});
   
    const token = jwt.sign({_id: checkEmail._id}, process.env.TOKEN_SECRET, {
        expiresIn: "3d"
    })
    res.header('token', token).json({
       token: token,
       firstname: checkEmail.firstname,
       lastname: checkEmail.lastname,
       id: checkEmail._id
    });
})

router.post('/signup', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt)
    const checkEmail = await User.findOne({email: req.body.email});
    if(checkEmail) return res.status(400).json({msg: "Email already exists"});


    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashPass,
        date_created: Date.now()
    });
    try{
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    }catch(err){
        res.status(400).json(err);
    }
})



module.exports = router;