const {Router} = require('express');
const {check} = require('express-validator');
const { obtenerProducto,
        obtenerProductoId,
        crearProducto,
        editarProducto,
        eliminarProducto
    } = require('../controllers/productos');

const {existeCategoriaPorId, existeProductoPorId} = require('../helpers/dbValidators');
const {validarCampos, validarJWT,tieneRole} = require('../middlewares');

const router = Router();

//Obtener Todas las categorias
router.get('/',obtenerProducto);

//Obtener una categoria por Id
router.get('/:id',[
    check('id','El ID no puede estar vacio').not().isEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],obtenerProductoId);

//Crear Categoria - privado - cualquier persona con token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un ID valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto);

// Actualizar - privado - Token valido
router.put('/:id',[
    validarJWT,
    check('id','El ID no puede estar vacio').not().isEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],editarProducto);

// Delete - privado - Token valido solo admin
router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],eliminarProducto);



module.exports = router;