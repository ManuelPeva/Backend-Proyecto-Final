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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log('Email recibido:', email);
    const user = await User.findOne({ email })
    console.log('Usuario encontrado:', user);

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generarToken(user.id)
        })
        
    }else{
        res.status(400)
        throw new Error('No es la credencial')
    }
})

const datosUser = asyncHandler(async (req, res) => {
    res.status(201).json(req.user)
})

//función para generar el token
const generarToken = (id_usuario) => {
    return jwt.sign({
        id_usuario
    }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
module.exports = {
    crearUser,
    loginUser,
    datosUser
}