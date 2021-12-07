const Base62Str = require("base62str").default;
const router = require("express").Router();
const URL = require('../models/TempURL')
const md5 = require('../utils/md5')
const generateRandomStr = require('../utils/generateRandomStr')
const selectRandomStr = require('../utils/selectRandomStr')

router.post('/', async (req,res) => {
    const base62 = Base62Str.createInstanceWithInvertedCharacterSet();
    const urlHashEncode = base62.encodeStr((md5(req.body.url)))
    const key = generateRandomStr(3)+selectRandomStr(urlHashEncode, 4)
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const shortenedURL = fullUrl +'/'+ key
    const date = new Date()
    const url = new URL({
        original_url: req.body.url,
        shortened_url: shortenedURL,
        date_created: Date.now(),
        expiresIn: date.setDate(date.getDate() + 1)
    })
        
    try{
        const saveURL = await url.save()
        res.status(200).json(saveURL)

    }catch(err){
        res.status(400).json({msg:err})
    }
})

router.get('/:id', async (req,res) => {
    const id = req.params.id
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const checkID = await URL.findOne({shortened_url:fullUrl})
    
    const dateNow = new Date().getTime()
    const expiresIn = new Date(checkID.expiresIn.getTime())

    if(checkID && dateNow < expiresIn){
        try{
            res.redirect(checkID.original_url)
        }catch(err){
            res.status(400).json({msg: err})
        }
    }
    if(checkID && dateNow > expiresIn)
        res.redirect('/404')
    if(!checkID){
        res.redirect('/404')
        //res.status(400).json({msg:"URL does not exist."})
    }
})




module.exports = router;