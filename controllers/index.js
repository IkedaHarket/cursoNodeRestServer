const  auth  = require('./auth');
const buscar = require('./buscar');
const categorias = require('./categorias');
const produtos = require('./productos');
const uploads = require('./uploads');
const usuarios = require('./usuarios');

module.exports = {
    ...auth,
    ...buscar,
    ...categorias,
    ...produtos,
    ...uploads,
    ...usuarios,
}