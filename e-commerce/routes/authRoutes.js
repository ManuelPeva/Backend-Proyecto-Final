const express = require('express');
const router = express.Router();
const {getClientes,createClientes, updateClientes, deleteClientes} = require('../controllers/authController');
const {protect} = require('../middlewares/authmiddleware')

//verbos
router.get('/', protect, getClientes);

router.post('/', protect, createClientes)

router.put('/:id', protect, updateClientes);

router.delete('/:id', protect, deleteClientes);

module.exports = router