const asyncHandler = require('express-async-handler');
const getClientes =asyncHandler( async (req, res) =>{
    res.status(200).json({ mensaje: 'Get Clientes'})
})

const createClientes =asyncHandler( async (req, res) =>{
    res.status(200).json({ mensaje: 'Cliente creado', datos: req.body })

    if(!req.body.descripcion){
        res.status(400)
        throw new Error('por favor asegurate de hacer el registro correctamente')
    }
})

const updateClientes =asyncHandler( async (req,res) =>{
    res.status(200).json({ mensaje: 'Actualizado con exito', id : req.params.id})
})

const deleteClientes =asyncHandler( async (req, res) =>{
    res.status(200).json({ mensaje: 'Eliminado con Exito', id : req.params.id})
})


module.exports = {
    getClientes,
    createClientes,
    updateClientes,
    deleteClientes


}