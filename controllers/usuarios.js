const { response,request } = require('express'); //No necesario, solo para que ayude el VS (editor)

const usuariosGet = (req = request,res = response)=>{
    const {q,nombre = "",apellido,apikey} = req.query;

    res.status(200).json({
        ok:true,
        nombre,
        // nombre:'Ikeda',
        msg:"GET",
        q,
        apellido,
        apikey
    })
}
// PODEMOS DESESTRUCTURAR EL REQ.BODY PARA UN POCO MAS DE SEGURIDADA
const usuariosPut = (req,res = response)=>{
    const {id} = req.params;
    res.status(200).json({
        ok:true,
        nombre:'Ikeda',
        msg:"PUT",
        id
    });
}
const usuariosPost = (req,res = response)=>{
    const body = req.body;  
    res.status(200).json({
        ok:true,
        nombre:'Ikeda',
        msg:"POST", 
        body
    });
}
const usuariosDelete = (req,res = response)=>{
    res.status(200).json({
        ok:true,
        nombre:'Ikeda',
        msg:"DELETE",
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