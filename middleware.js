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