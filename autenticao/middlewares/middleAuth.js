const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
     const authHeader = req.headers['authorization']
     if(!authHeader){
        res.status(401).json({mensagem: 'Token não informado'})
        return
     }

     try{
        const [,token] = authHeader.split(' ')
        const decodedToken = jwt.verify(token,'secret-123')
     }catch(err){
        res.status(400).json({mensagem: 'Token inválido', content: err})
     }

     next()
} 