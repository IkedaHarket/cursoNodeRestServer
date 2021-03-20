const {Router} =  require('express');
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch,
        error
    } = require('../controllers/usuarios');
const router = Router();

router.get('/',usuariosGet);
router.put('/:id',usuariosPut); //Express parsea y manda en variable el :id en req.params.id
router.post('/',usuariosPost);
router.delete('/',usuariosDelete);
router.patch('/',usuariosPatch);



module.exports = router;