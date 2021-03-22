const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const {Usuario,Categoria,Producto} = require('../models');

const coleccionesPermitidas = [
    'categoria',
    'productos',
    'roles',
    'usuarios',
]
const buscarUsuarios = async(termino = '',res = response)=>{
    const esMongoID = ObjectId.isValid(termino)
    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results:(usuario)?[usuario]:[]
        })
    }
    const regex = new RegExp(termino,'i') //Insensible a minusculas y mayusculas
    const usuarios = await Usuario.find({
        $or: [{nombre: regex},{correo: regex}],
        $and:[{estado:true}]
    });
    // const numeroUsuarios = await Usuario.countDocuments({
    //     $or: [{nombre: regex},{correo: regex}],
    //     $and:[{estado:true}]
    // });
    return res.json({
        results: [usuarios]
    })
}
const buscarCategorias = async(termino = '',res = response)=>{
    const esMongoID = ObjectId.isValid(termino)
    if(esMongoID){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results:(categoria)?[categoria]:[]
        })
    }
    const regex = new RegExp(termino,'i') //Insensible a minusculas y mayusculas
    const categoria = await Categoria.find({nombre:regex});
    return res.json({
        results: [categoria]
    })
}
const buscarProductos = async(termino = '',res = response)=>{
    const esMongoID = ObjectId.isValid(termino)
    if(esMongoID){
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            results:(producto)?[producto]:[]
        })
    }
    const regex = new RegExp(termino,'i') //Insensible a minusculas y mayusculas
    const producto = await Producto.find({nombre:regex})
                                        .populate('categoria','nombre');
    return res.json({
        results: [producto]
    })
}

const buscar = (req,res = response) =>{

    const {coleccion,termino} = req.params;
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }
    switch(coleccion){
        case 'usuarios':
            buscarUsuarios(termino,res);
            break;
        case 'categoria':
            buscarCategorias(termino,res);
            break;
        case 'productos':
            buscarProductos(termino,res);
            break;
        default:
            res.status(500).json({
                msg:"Se nos olvido hacer esta busqueda... Ops"
            })
    }
}

module.exports={
    buscar,
}