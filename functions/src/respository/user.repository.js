exports.create = async(data) => {
    /*
    const novoUsuario = await new Usuario(data);
    await novoUsuario.save();
    return novoUsuario; 
    */
}

exports.getUser = async(id) => {
    /*
    const res = await Usuario.findById(id);
    return res;
    */
}

exports.getUsersFromUser = async(id) => {
    /*
    const res = await Usuario.find({usuario : id});
    return res;
    */
}

exports.put = async(id, data) => {
/*
    var objectToUpdate =  {};
    if(data.nome) objectToUpdate.nome = data.nome;
    if(data.email) objectToUpdate.email = data.email;
    if(data.senha) objectToUpdate.senha = data.senha;
    if(data.role) objectToUpdate.role = data.role;
    if(data.role) objectToUpdate.usuario = data.usuario;

    const res = await Usuario.findByIdAndUpdate(id, objectToUpdate, {new: true})
    return res;
    */
}

exports.authenticate = async(data) => {
    /*
    const res = await Usuario.findOne({
        email: data.email,
        senha: data.senha
    });

    return res;
    */
}