const fs   = require('fs');
const path = require('path');

// crea la carpeta si no existe
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

const logFilePath = path.join(logsDir, 'access.log');

module.exports = (req, res, next) => {
  if (process.env.NODE_ENV !== 'development') return next();

  const timestamp = new Date().toISOString();
  const { method, originalUrl, body } = req;
  let log = `[${timestamp}] ${method} ${originalUrl}`;

  if (['POST', 'PUT'].includes(method)) log += ` | Body: ${JSON.stringify(body)}`;

  console.log(log);
  fs.appendFileSync(logFilePath, log + '\n');
  next();
};
