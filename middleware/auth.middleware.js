const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    if(req.method === 'OPTIONS'){
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]//Bearer token
        if(!token){
            return res.status(401).json({message:'Not Auth'})
        }
        const decoded = jwt.verify(token,'jwtSecret')
        req.user = decoded
        next()
    } catch (e){
        res.status(401).json({message:'Not Auth'})
    }

}