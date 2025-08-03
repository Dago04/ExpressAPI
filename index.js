require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/db');
const usersRoutes = require('./routes/users');
const blogsRoutes = require('./routes/blogs');

// Conectar a la base de datos
connectDB(); 

// Middleware para parsear JSON
app.use(express.json());
// Middleware para registrar peticiones
app.use(logger);

// Rutas de la API
app.use('/api/users', usersRoutes);
app.use('/api/blogs', blogsRoutes);

// Middleware para manejar errores
app.use(errorHandler);

// Inicia el servidor
app.listen(port, () =>{
    console.log(`Servidor escuchando en http://localhost:${port}`);
    console.log('Entorno:', process.env.NODE_ENV);
});
