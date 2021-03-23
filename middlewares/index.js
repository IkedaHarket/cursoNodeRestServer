// const  validarJWT  = require('../middlewares/validarJWT');
// const validaRoles = require('../middlewares/validarRoles');
// const validarCampos = require('../middlewares/validarCampos');
// const validarArchivo = require('../middlewares/validarArchivo');

const  validarJWT  = require('./validarJWT');
const validaRoles = require('./validarRoles');
const validarCampos = require('./validarCampos');
const validarArchivo = require('./validarArchivo');

module.exports = {
    ...validarJWT,
    ...validaRoles,
    ...validarCampos,
    ...validarArchivo,
}