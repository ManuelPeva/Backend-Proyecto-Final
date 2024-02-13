const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const authRoutes = require('./routes/authRouttes');
const port = process.env.PORT || 5000;

const app = express();

//verbos
app.get('/api/cliente', (req, res) => {
    res.status(500).json({mensaje: 'Get cliente'});
});

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});