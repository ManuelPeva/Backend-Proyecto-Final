const express = require("express");
const colors = require("colors");
const connectDB = require('./config/db')
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const authRoutes = require('./routes/authRoutes');
const {errorHandler} = require('./middlewares/errorMiddleware')
const port = process.env.PORT || 5000;

connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/cliente', require('./routes/authRoutes'));
//ruta de usuarios 
app.use('/api/users', require('./routes/usersRoutes'));

app.use(errorHandler);
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});