const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Por favor es necesario poner tu nombre']
    },
    email: {
        type: String,
        required: [true, 'es necesario poner tu email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'es necesario poner una contraseña']
    },
    esAdmin: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

//preguntar mas adelante si es admin o no, dependiendo de la selección vera o editara contenido

module.exports = mongoose.model('User', userSchema)