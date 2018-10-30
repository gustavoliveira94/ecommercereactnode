const repository = require('../respository/user.repository')
const md5 = require('md5')
const config = require('../../config');
const authService = require('../services/auth.service')
const ValidatorContract = require('../validator/userValidator');

exports.create = async (req, res) => {

    const contract = new ValidatorContract();
    contract.hasMinLen(req.body.nome, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.senha, 6, 'A senha deve conter pelo menos 6 caracteres');

    try {

        if(!contract.isValid()) {
            res.status(400).send(contract.errors()).end();
            return;
        }

        var data = await repository.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: md5(req.body.senha + config.SALT),
            roles: req.body.roles,
            usuario: req.body.usuario
        });
        
        
        var token = await authService.generateToken({
            email: data.nome,
            senha: data.email
        });
        

        res.status(201).send({
            token: token,
            successo: "Cadastro realizado com sucesso",
            cadastrado: data
        })
        
    }
    catch(e) {
        res.status(500).send({
            message: "Não foi possivel cadastrar este usuário",
            error: e
        })
    }
}

exports.getUsersFromUser = async(req, res) => {

    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const dataUser = await authService.decodeToken(token); 

        const data = await repository.getUsersFromUser(dataUser.id);

        res.status(201).send(data);
    }
    catch(e) {
        res.status(400).send({
            message: "não foi possivel exibir a lista de usuarios",
            error: e
        })
    }
    
}

exports.getUser = async(req, res) => {

    try {
        
        const data = await repository.getUser(req.params.id);

        res.status(201).send({
	     id: data._id, 
             nome: data.nome,
             email: data.email, 
             senha: data.senha, 
             role: data.role,  
             usuario: data.usuario
	});
    }
    catch(e) {

    }

}


exports.authenticate = async(req, res) => {
    
    try {
        
        var data = await repository.authenticate({
            email: req.body.email,
            senha: md5(req.body.senha + config.SALT)
        })

    
        if(!data) {
            res.status(404).send({
                message: "Email ou Senha inválidos",
            });
            return;
        }
       

        var token = await authService.generateToken({
            id: data._id,
            email: data.email,
            nome: data.nome,
            roles: data.role
        });
 
        res.status(201).send({
            token: token,
            id: data.id,
            email: data.email,
            nome: data.nome,
            role: data.role
        });

    }
    catch(e) {
        res.status(401).send({
            message: "Não foi possivel cadastrar este usuário",
            error: e
        })
    }

}

exports.put = async(req, res) => {

    req.body.senha = md5(req.body.senha + config.SALT);

    try {
        const data = await repository.put(req.params.id, req.body);
        res.status(201).send({
	     id: data._id, 
             nome: data.nome,
             email: data.email, 
             senha: data.senha, 
             role: data.role,  
             usuario: data.usuario
	});
    }
    catch(e) {
        res.status(401).send({
            error:e
        })
    }
    
}