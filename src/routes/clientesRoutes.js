const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/ClienteController');

// Rutas de Clientes
router.get('/', ClienteController.listar);
router.get('/:id', ClienteController.obtener);
router.post('/', ClienteController.crear);
router.put('/:id', ClienteController.actualizar);
router.delete('/:id', ClienteController.eliminar);

module.exports = router;
