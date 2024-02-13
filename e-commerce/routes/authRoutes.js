const express = require('express');
const router = express.Router();
const {getClientes,createClientes, updateClientes, deleteClientes} = require('../controllers/authController');

//verbos
router.get('/', getClientes);

router.post('/', createClientes)

router.put('/:id', updateClientes);

router.delete('/:id', deleteClientes);

module.exports = router