const {Router} = require('express');
const {check} = require('express-validator');


const { cargarArchivo, actualizarImagen,mostrarImagen } = require('../controllers');

const { coleccionesPermitidas } = require('../helpers');
const { validarCampos,validarArchivo } = require('../middlewares');

const router = new Router();

router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen);


router.post('/',validarArchivo,cargarArchivo)

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagen)

module.exports = router;