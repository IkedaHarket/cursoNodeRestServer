const { response } = require("express");
const {Categoria} = require('../models')

const obtenerCategorias = async(req,res)=>{
    const {limit = 50, desde = 0} = req.query;

    const [total,categorias] = await Promise.all([
        Categoria.countDocuments({estado: true}), //Primera promesa
        Categoria.find({estado: true})
        .populate('usuario','nombre')
        .skip(Number(desde))
        .limit(Number(limit))//Segunda promesa
    ]);

    res.status(200).json({total,categorias})
}
const obtenerCategoriasId = async(req,res)=>{
    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario','nombre');
    res.status(200).json({categoria})
}


const crearCategoria = async(req,res=response) =>{

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg:`La categoria ${categoriaDB.nombre} ya existe`
        })
    }

    //generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data);
    //guardar DB
    await categoria.save();
    res.status(201).json(categoria)

}
const editarCategoria = async(req,res)=>{

    const {id} = req.params; 
    const {estado,_id,usuario,...data}  = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    // const categoriaDB = await Categoria.findOne({nombre});

    // if(categoriaDB){
    //     return res.status(400).json({
    //         msg:`La categoria ${categoriaDB.nombre} ya existe`
    //     })
    // }

    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true});

    res.status(200).json(categoria);

}
const eliminarCategoria = async(req,res)=>{
    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id,{estado: false},{new:true});
    res.status(200).json({categoria});
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriasId,
    editarCategoria,
    eliminarCategoria
}