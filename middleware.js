const jwt = require('jsonwebtoken')

module.exports = function validaDados(req, res, next){
    const { name, email} = req.body
    if(name === ''){
        res.status(400).json({mensagem:'O nome não foi informado'})
        return
    }

    if(email === ''){
        res.status(400).json({mensagem:'O email não foi informado'})
        return
    }
    next()
}

module.exports = function verificaToken (req, res, next)  {
    const authHeader = req.headers['authorization']
    if(!authHeader){
        res.status(401).send({ message: 'Precisa estar logado para realizar esta operação'})
        return
    }

    const [,token] = authHeader.split(' ')
    const decoded = jwt.verify(token,process.env.SECRET_KEY)
    if(decoded.perfil != 'ADM'){
        res.status(403).send({ message: 'Somente perfil ADM pode realizar esta operação'})
        return
    }
    next()
}