const mongoose = require('mongoose')

const productoSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
        },
    producto: {
        type: String,
        required: [true, 'porfavor, proporciona un nombre para el producto']
    },
    descripcion: {
        type: String,
        required: [true, 'por favor, proporciona un descripción']
    },
    costo: {
        type: Number,
        required: [true, 'por favor, proporciona el costo del producto']
    }
})

module.exports = mongoose.model('Producto', productoSchema)
