const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const crearUser = asyncHandler( async (req, res) => {

    //Crear un nuevo usuario en la base de datos con el body que le pasamos
   const { name, email, password} = req.query
    
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Faltan datos')
    }

    

    //verificar que ese usuario no exista a traves de su email
    const userExiste = await User.findOne({email})
    if(userExiste){
        res.status(400)
        throw new Error ('El usuario ya esta registrado con ese correo')
    }

    // Hacemos el Hash al password
    //const salt = await 

    res.status(201).json({message: 'Crear Usuario' })

})

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