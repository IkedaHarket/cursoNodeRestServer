const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/googleVerify');

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

const googleSignin = async(req, res=response)=>{

    const {id_token} = req.body

    try {
        let {nombre,img,correo} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});//verifica si existe usuario con el correo

        if(!usuario){
            //creamos usuario
            const data = {
                nombre,
                correo,
                password: 'Cuenta Google :)',
                img,
                google: true
            }
            usuario = new Usuario(data);
            await usuario.save();
        }

        //Si el usuario en BD  (Tu sabias que se te olvidaria el significado de esto :) 21-03-2021 21:24)

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado :('
            })
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            msg:'Token de Google invalido'
        })
    }


    
}
module.exports = {
    login,
    googleSignin
}