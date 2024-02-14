const asyncHandler = require('express-async-handler');
const Producto = require('../models/comprasModels')

const getClientes = asyncHandler(async (req, res) => {
    const productos = await Producto.find();
    res.status(200).json(productos)
});

const createClientes = asyncHandler(async (req, res) => {
    
    if (!req.body.descripcion) {
        res.status(400)
        throw new Error('Por favor, asegúrate de hacer el registro correctamente')
    }

    const producto = await Producto.create({
        producto: req.body.producto,
        descripcion: req.body.descripcion,
        costo: req.body.costo
    })

    // Envía la respuesta después de crear el producto
    res.status(200).json(producto)

    const productoActualizado = await Producto.find();
    
    //console.log('Producto actualizados', productoActualizado);
})

const updateClientes = asyncHandler(async (req, res) => {
    res.status(200).json({ mensaje: 'Actualizado con éxito', id: req.params.id })
})

const deleteClientes = asyncHandler(async (req, res) => {
    res.status(200).json({ mensaje: 'Eliminado con éxito', id: req.params.id })
})

module.exports = {
    getClientes,
    createClientes,
    updateClientes,
    deleteClientes
}
