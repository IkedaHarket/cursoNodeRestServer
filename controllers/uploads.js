const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { subirArchivo } = require("../helpers/subirArchivo");

const {Usuario,Producto} = require('../models');

const extenciones = [
    'png','jpg','jpeg','gif'
];

const cargarArchivo = async(req,res = response) =>{

    try {

        const nombre = await subirArchivo(req.files,extenciones);
        
        res.json({
            nombre
        });

    } catch (msg) {
        res.status(400).json({
            msg
        })
    }
}
const actualizarImagen = async(req,res=response)=>{

    const {id,coleccion} = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                });
            }
            break;
        default:
                return res.status(500).json({
                    msg: "Ops como pudimos olvidar validar esto D:"
                })
            break;
    }

    //limpiar imagenes previas
        if(modelo.img){
            //Borramos la imagen del servidor
            const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img );
            if(fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen);
            }
        }


    modelo.img = await subirArchivo(req.files,extenciones,coleccion);

    await modelo.save();

    res.json({id,coleccion})

}
const mostrarImagen = async(req,res = response)=>{

    const {id,coleccion} = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                });
            }
            break;
        default:
                return res.status(500).json({
                    msg: "Ops como pudimos olvidar validar esto D:"
                })
            break;
    }

        if(modelo.img){
            const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img );
            if(fs.existsSync(pathImagen)){
                return res.sendFile(pathImagen)
            }
        }else{
            const pathImagen = path.join(__dirname,'../uploads/noImage.jpg' );
            if(fs.existsSync(pathImagen)){
                return res.sendFile(pathImagen)
            }
        }
        res.status(500).json({

            msg:'La verdad no se como se activo esto... Sera un dolor de cabeza arreglarlo (Imagen no encontrada)',
        })
}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}