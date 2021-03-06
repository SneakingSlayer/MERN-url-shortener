const Base62Str = require("base62str").default;
const router = require("express").Router();
const URL = require('../models/URL')
const md5 = require('../utils/md5')
const generateRandomStr = require('../utils/generateRandomStr')
const selectRandomStr = require('../utils/selectRandomStr')
const verifyToken = require('../middleware/auth')
router.post('/', verifyToken, async (req,res) => {
    const base62 = Base62Str.createInstanceWithInvertedCharacterSet();
    const urlHashEncode = base62.encodeStr((md5(req.body.url)))
    const key = generateRandomStr(3)+selectRandomStr(urlHashEncode, 4)
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const shortenedURL = fullUrl +'/'+ key

    console.log(req.headers.authorization)
    const url = new URL({
        user_id: req.body.id,
        url_name: req.body.urlName,
        original_url: req.body.url,
        shortened_url: shortenedURL,
        view_count: 0,
        date_created: Date.now()
    })

    const checkUserURL = await URL.findOne({
        user_id: req.body.id,
        original_url: req.body.url
    })

    if(checkUserURL){
        res.status(400).json({msg:"URL already exists!"})
    }
        
    if(!checkUserURL){
        try{
            const saveURL = await url.save()
            res.status(200).json(saveURL)

        }catch(err){
            res.status(400).json({msg:err})
        }
    }
})

router.get('/:id', async (req,res) => {
    const id = req.params.id
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const checkID = await URL.findOne({shortened_url:fullUrl})
    
    if(checkID){
        try{
            const query = {shortened_url:fullUrl}
            const newCount = { $set: {view_count: (parseInt(checkID.view_count)+1).toString()} }
            const updateCount = await URL.updateOne(query, newCount)
            res.redirect(checkID.original_url)
        }catch(err){
            res.status(400).json({msg: err})
        }
    }
    if(!checkID){
        res.redirect('/404')
        //res.status(400).json({msg:"URL does not exist."})
    }
})




module.exports = router;