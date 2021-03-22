const {Router} = require('express');
const {check} = require('express-validator');
const { crearCategoria,
        obtenerCategorias,
        obtenerCategoriasId,
        editarCategoria,
        eliminarCategoria
    } = require('../controllers/categorias');

const {existeCategoriaPorId} = require('../helpers/dbValidators');
const {validarCampos, validarJWT,tieneRole} = require('../middlewares');

const router = Router();

//Obtener Todas las categorias
router.get('/',obtenerCategorias);

//Obtener una categoria por Id
router.get('/:id',[
    check('id','El ID no puede estar vacio').not().isEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoriasId);

//Crear Categoria - privado - cualquier persona con token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);

// Actualizar - privado - Token valido
router.put('/:id',[
    validarJWT,
    check('id','El ID no puede estar vacio').not().isEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],editarCategoria);

// Delete - privado - Token valido solo admin
router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],eliminarCategoria);








module.exports = router;