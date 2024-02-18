const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const crearUser = asyncHandler(async (req, res) => {
    try {
        // Crear un nuevo usuario en la base de datos con el body que le pasamos
        const { username, email, password } = req.query;

        if (!username || !email || !password) {
            res.status(400);
            throw new Error('Faltan datos');
        }

        // Verificar que ese usuario no exista a través de su email
        const userExiste = await User.findOne({ email });
        if (userExiste) {
            res.status(400);
            throw new Error('El usuario ya está registrado con ese correo');
        }

        // Hacer el Hash al password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);

        // Crear el usuario
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                password: hashedPassword
            });
        } else {
            res.status(400);
            throw new Error('Error interno del servidor, no se puede registrar el usuario');
        }
    } catch (error) {
        // Manejar errores
        res.status(500).json({ error: error.message });
    }
});




const loginUser =asyncHandler(  async(req, res) => {
    res.status(201).json({message: 'Login del usuario' })
})

const datosUser =asyncHandler(  async(req, res) => {
    res.status(201).json({message: 'Datos del usuario' })
})

module.exports = {
    crearUser,
    loginUser,
    datosUser
}