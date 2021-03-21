const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la DB`);
    }
}
const emailExiste = async(correo)=>{
    //Verificar si existe el correo
    const email = await Usuario.findOne({correo})
    if(email){
        throw new Error(`El correo ${correo} ya existe en la DB`);
    }
}
const existeUsuarioPorId = async(id)=>{
    //Verificar si existe el id para un usuario
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id ${id} no existe`);
    }
}




module.exports ={
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
}