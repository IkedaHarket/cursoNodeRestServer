const {Router} =  require('express');
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch,
    } = require('../controllers/usuarios');
const {
    validarJWT,
    esAdminRole,
    tieneRole,
    validarCampos
} = require('../middlewares')///index por defecto

const { esRoleValido,
        emailExiste,
        existeUsuarioPorId
    } = require('../helpers/dbValidators');


const router = Router();

router.get('/',usuariosGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),//<- check('rol').custom((id) =>existeUsuarioPorId(id)) Se obvia esto
    check('rol').custom(esRoleValido),//<- check('rol').custom((rol) =>esRoleValido(rol)) Se obvia esto
    validarCampos
],usuariosPut); //Express parsea y manda en variable el :id en req.params.id

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser de mas de 6 caracteres').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),//<- check('correo').custom((rol) =>existeUsuarioPorId(correo)) Se obvia esto
    // check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),//<- check('rol').custom((rol) =>esRoleValido(rol)) Se obvia esto
    validarCampos
],usuariosPost);

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),//<- check('rol').custom((id) =>existeUsuarioPorId(id)) Se obvia esto
    validarCampos
],usuariosDelete);

router.patch('/',usuariosPatch);



module.exports = router;