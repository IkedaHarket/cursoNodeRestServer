const  validarJWT  = require('../middlewares/validarJWT');
const validaRoles = require('../middlewares/validarRoles');
const validarCampos = require('../middlewares/validarCampos');

module.exports = {
    ...validarJWT,
    ...validaRoles,
    ...validarCampos
}