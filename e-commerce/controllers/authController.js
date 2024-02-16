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

    //Envía la respuesta después de crear el producto
    //res.status(200).json(producto)

    //observar 
    const productoActualizado = await Producto.find();
    res.status(200).json(productoActualizado)
    //console.log('Producto actualizados', productoActualizado);
})

const updateClientes = asyncHandler(async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id)

        if (!producto) {
            res.status(404)
            throw new Error("El producto no existe")
        }

        const productoUpdated = await Producto.findByIdAndUpdate(req.params.id , req.body, { new:true });   
        
        if (!productoUpdated) {
            res.status(404)
            throw new Error("Error al actualizar el producto")
        }

        console.log('Producto actualizado:', productoUpdated);
        res.status(200).json({ productoUpdated })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error del servidor" });
    }
});

const deleteClientes = asyncHandler(async (req, res) => {
    const producto = await Producto.findById(req.params.id)

    if (!producto) {
        res.status(404)
        throw new Error("El producto no existe")
    }
    await Producto.deleteOne(producto)

    // const productoDelete = await Producto.findByIdAndDelete(req.params.id)

    res.status(200).json({ message:'Documento eliminado con exito', id: req.params.id })
    

})

module.exports = {
    getClientes,
    createClientes,
    updateClientes,
    deleteClientes
}
