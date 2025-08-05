
require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/db');
const usersRoutes = require('./routes/users');
const blogsRoutes = require('./routes/blogs');
const authRoutes  = require('./routes/auth')
const cors = require('cors');


// Conectar a la base de datos
connectDB(); 

app.use(cors({
  origin: [
    'http://localhost:4321',
    'http://localhost:3000',
    'https://expressapi-172e.onrender.com'], // añade más dominios si los tendrás
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,                 // por si luego usas cookies
}));


// Middleware para parsear JSON
app.use(express.json());

// Middleware para registrar peticiones
app.use(logger);

// Rutas de la API

app.use('/api/users', usersRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/auth',  authRoutes); 

// Middleware para manejar errores
app.use(errorHandler);

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Servidor escuchando en http://localhost:${port}`);
    console.log('Entorno:', process.env.NODE_ENV);
});
