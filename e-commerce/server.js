const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const authRoutes = require('./routes/authRoutes');
const port = process.env.PORT || 5000;

const app = express();

app.use('/api/cliente', require('./routes/authRoutes'))

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});