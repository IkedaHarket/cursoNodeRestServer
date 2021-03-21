const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');

const login = async(req,res = response) =>{
    const {correo,password} = req.body;
    try {
        //verificar si correo existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: "Usuario o password incorrectos"
            })
        }
        //verificar si usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: "El Usuario esta inhabilitado"
            })
        }
        //verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: "Usuario o password incorrectos"
            })
        }
        //generarJWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Ops, algo salio mal..."
        })
    }
    
}

module.exports = {
    login,
}