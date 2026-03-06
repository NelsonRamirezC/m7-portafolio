const { RAW } = require("sequelize/lib/query-types");
const {Producto} = require("../models/index.js");

// Controlador de Productos
class ProductoController {
  async listar(req, res) {
    try {
      // TODO: Implementar lógica
      let productos = await Producto.findAll();
      res.json({ productos, mensaje: 'ok' });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtener(req, res) {
    try {
      // TODO: Implementar lógica

      let { id } = req.params;

        const producto = await Producto.findByPk(id);

        if(!producto) return res.status(404).json({mensaje: "Producto no encontrado."});


      res.json({ producto, mensaje: 'ok' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async crear(req, res) {
    try {
        let { nombre, descripcion, precio, descuento, stock } = req.body;

        let producto = await Producto.create({ nombre, descripcion, precio, descuento, stock });

      res.status(201).json({ producto, mensaje: 'producto creado con éxito.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      // TODO: Implementar lógica

        let { id } = req.params;

        const producto = await Producto.findByPk(id);

        if(!producto) return res.status(404).json({mensaje: "Producto no encontrado."});

        let { nombre, descripcion, precio, descuento, stock } = req.body;
        
        await producto.update({nombre, descripcion, precio, descuento, stock });

      res.json({ producto, mensaje: 'producto actualizado.' });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      // TODO: Implementar lógica
      res.json({ mensaje: 'Eliminar producto' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProductoController();
