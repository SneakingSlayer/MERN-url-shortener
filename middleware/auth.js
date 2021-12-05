const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) =>{
   const bearerHeader = req.headers['authorization'];
  // console.log(req.headers['authorization'])
    if(typeof bearerHeader !== 'undefined' || null || ''){
        const bearer = bearerHeader;
        jwt.verify(bearer, process.env.TOKEN_SECRET, (err, ver) => {
            if(err){
                res.status(403).json({msg: err.message})
            }
            else{
                next()
            }
        })
    }
    else{
        res.status(403).json({msg: "Authorization is null."})
    }
}

module.exports = verifyToken;