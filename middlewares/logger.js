const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/access.log');

const logger = (req,res,next) =>{
    // Solo activa el middleware si estamos en entorno "development"
    if (process.env.NODE_ENV !== 'development') {
        return next();
    }

    const timestamp = new Date().toISOString();
    const {method, originalUrl, body} = req;
    
     // Crear mensaje de log
    let log = `[${timestamp}] ${method} ${originalUrl}`;

     // Si es POST o PUT, incluir el body
    if (['POST', 'PUT'].includes(method)) {
        log += ` | Body: ${JSON.stringify(body)}`;
    }

     // Imprimir en consola
    console.log(log);

    // Guardar en archivo (append)
    fs.appendFileSync(logFilePath, log + '\n');

    next();

};

module.exports = logger; 