const express = require('express');
const router = express.Router();
const VentaController = require('../controllers/VentaController');

// Rutas de Ventas
router.get('/', VentaController.listar);
router.get('/:id', VentaController.obtener);
router.post('/', VentaController.crear);
router.put('/:id', VentaController.actualizar);
router.delete('/:id', VentaController.eliminar);

module.exports = router;
