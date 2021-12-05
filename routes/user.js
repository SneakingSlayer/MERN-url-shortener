const router = require("express").Router();
const URL = require('../models/URL')
const jwt_decode = require('jwt-decode')
const verifyToken = require('../middleware/auth')
const User = require('../models/User')
router.get('/:id', verifyToken, async (req,res) => {
    const token = req.headers.authorization
    if(token === null || token === undefined || token === ''){
        res.status(200).json({msg: "empty"})
        return
    }
    const id = req.params.id
    const decodedID = jwt_decode(token)._id
    
    if(decodedID !== id){
        res.status(200).json({msg: "Unauthorized access."})
        return
    }

    if(decodedID === id ){
        const checkID = await URL.find({user_id:id}).sort({ date_created : -1})
        if(checkID && decodedID === id){
            res.status(200).json(checkID)
        }
        if(!checkID){
            res.status(400).json({msg:"Not found."})
        }
    }
})

router.get('/info/:id', verifyToken, async (req, res)=>{
    const token = req.headers.authorization
    if(token === null || token === undefined || token === ''){
        res.status(400).json({msg: "empty"})
        return
    }
    const id = req.params.id
    const decodedID = jwt_decode(token)._id
    
    if(decodedID !== id){
        res.status(400).json({msg: "Unauthorized access."})
        return
    }

    if(decodedID === id ){
        const checkID = await User.find({_id:id})
        if(checkID && decodedID === id){
            res.status(200).json(checkID)
        }
        if(!checkID){
            res.status(400).json({msg:"Not found."})
        }
    }
})


router.delete('/:id', verifyToken, async (req,res) => {
    const token = req.headers.authorization
    const URLId = req.body.id
    if(token === null || token === undefined || token === ''){
        res.status(200).json({msg: "empty"})
        return
    }
    const id = req.params.id
    const decodedID = jwt_decode(token)._id
    if(decodedID !== id){
        res.status(400).json({msg: "Unauthorized access."})
        return
    }

    if(decodedID === id ){
        try{
            const query = {_id: URLId}
            const deleteURL = await URL.deleteOne(query)
            res.send({msg: "Removed successfully."})

        }catch(err){
            res.status(400).json({msg: "Unauthorized access."})
        }
    }
}) 


module.exports = router;