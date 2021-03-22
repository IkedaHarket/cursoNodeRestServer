const { Categoria,Role,Usuario, Producto } = require('../models');

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
const existeCategoriaPorId = async(id)=>{
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`El id ${id} no existe`);
    }
}
const existeProductoPorId = async(id)=>{
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El id ${id} no existe`);
    }
}




module.exports ={
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}