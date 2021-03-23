const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas =['png','jpg','jpeg','gif'], carpeta = '')=>{
    return new Promise((resolve,reject) =>{

        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
    
        //Validar la extencion

        if(!extensionesValidas.includes(extension)){
            return reject(`La extencion ${extension} no es permitida, intenta con ${extensionesValidas}`);
        }
    
        const nombreFinal = uuidv4()+'.'+extension;
    
        const uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreFinal);
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
            reject(err)
          }
      
          resolve(nombreFinal);
        });
    } ) 
}

module.exports = {
    subirArchivo
}