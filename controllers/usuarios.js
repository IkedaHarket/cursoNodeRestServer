const { response,request } = require('express'); //No necesario, solo para que ayude el VS (editor)
const bcryptjs = require('bcryptjs'); //Encripta pass
const Usuario = require('../models/usuario');

const usuariosGet = async(req = request,res = response)=>{

    const {limit = 50, desde = 0} = req.query;
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}), //Primera promesa
        Usuario.find({estado: true}).skip(Number(desde)).limit(Number(limit))//Segunda promesa
    ]);

    res.status(200).json({total,usuarios})
}
// PODEMOS DESESTRUCTURAR EL REQ.BODY PARA UN POCO MAS DE SEGURIDADA
const usuariosPut = async(req,res = response)=>{
    const {id} = req.params;
    const {_id, password,google,correo, ...resto}  = req.body;

    //Validar contra base de datos
    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();//Numero de vueltas de encriptacion. 10 Default
        resto.password = bcryptjs.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.status(200).json(usuario);
}

const usuariosPost = async (req,res = response)=>{

    const {nombre,correo,password,rol} = req.body;  
    const usuario = new Usuario({
        nombre,correo,password,rol
    });
    
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();//Numero de vueltas de encriptacion. 10 Default
    usuario.password = bcryptjs.hashSync(password,salt);
    //guardar en DB
    await usuario.save()

    res.status(200).json({
        usuario
    });
}
const usuariosDelete = async(req,res = response)=>{
    const {id} = req.params;
    
    // const usuario = await Usuario.findByIdAndDelete(id);//Borrado Fisicamente
    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false});
    res.status(200).json({
        usuario
    });
}
const usuariosPatch = (req,res = response)=>{
    res.status(200).json({
        ok:true,
        nombre:'Ikeda',
        msg:"PATCH",
    });
}
module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,

}