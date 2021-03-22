const { response } = require("express");
const {Producto} = require('../models');

const obtenerProducto = async(req,res)=>{
    const {limit = 50, desde = 0} = req.query;

    const [total,productos] = await Promise.all([
        Producto.countDocuments({estado: true}), //Primera promesa
        Producto.find({estado: true})
        .populate('usuario','nombre')
        .populate('categoria','nombre')
        .skip(Number(desde))
        .limit(Number(limit))//Segunda promesa
    ]);

    res.status(200).json({total,productos})
}
const obtenerProductoId = async(req,res)=>{
    const {id} = req.params;
    const producto = await Producto.findById(id)
                                        .populate('usuario','nombre')
                                        .populate('categoria','nombre');
    res.status(200).json({producto})
}
const crearProducto = async(req,res)=>{
    const {estado,usuario,...body} = req.body;

    const productoDB = await Producto.findOne({nombre: body.nombre});

    if(productoDB){
        return res.status(400).json({
            msg:`El producto ${productoDB.nombre} ya existe`
        })
    }

    //generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    const producto = new Producto(data);
    //guardar DB
    await producto.save();
    res.status(201).json(producto)
}


const editarProducto = async(req,res)=>{
    const {id} = req.params; 
    const {estado,usuario,...data}  = req.body;
    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});

    res.status(200).json(producto);
}
const eliminarProducto = async(req,res)=>{
    const {id} = req.params;
    const producto = await Producto.findByIdAndUpdate(id,{estado: false},{new:true});
    res.status(200).json({producto});
}

module.exports = {
        obtenerProducto,
        obtenerProductoId,
        crearProducto,
        editarProducto,
        eliminarProducto,    
}