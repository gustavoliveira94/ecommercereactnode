const jwt = require('jsonwebtoken')
const config = require('../../config')

exports.generateToken = async(data) => {
    return jwt.sign(data, config.SALT, { expiresIn: '1d' });
}

exports.decodeToken = async(token) => {
    var data = await jwt.verify(token, config.SALT)
    return data;
}

exports.authorize = (req, res, next) => {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token) {
        res.status(401).send({
            mensagem: "Acesso restrito"
        })
    }
    else {
        
        jwt.verify(token, config.SALT, (error, decoded) => {

            if(error) {
                res.status(401).send({
                    mensagem: "Token Invalido"
                })
            }
            else {
                next();
            }

        });
        
    }


}