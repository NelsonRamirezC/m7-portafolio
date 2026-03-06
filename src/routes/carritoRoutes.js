const express = require('express');
const router = express.Router();
const CarritoController = require('../controllers/CarritoController');

// Rutas de Carrito
router.get('/:clienteId', CarritoController.listar);
router.post('/', CarritoController.agregar);
router.put('/:id', CarritoController.actualizar);
router.delete('/:id', CarritoController.eliminar);
router.delete('/:clienteId/vaciar', CarritoController.vaciar);

module.exports = router;
