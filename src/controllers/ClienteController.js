const {Cliente} = require("../models/index.js");

// Controlador de Clientes
class ClienteController {
  async listar(req, res) {
    try {
      // TODO: Implementar lógica
        let clientes = await Cliente.findAll();

      res.json({ clientes, mensaje: 'ok' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtener(req, res) {
    try {
      // TODO: Implementar lógica
      let { id } = req.params;
      let cliente = await Cliente.findByPk(id);

      if(!cliente) return res.status(404).json({mensaje: "Cliente no existe..." })

      res.json({ cliente, mensaje: 'ok' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async crear(req, res) {
    try {
      // TODO: Implementar lógica
      res.json({ mensaje: 'Crear cliente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      // TODO: Implementar lógica
      res.json({ mensaje: 'Actualizar cliente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      // TODO: Implementar lógica
      res.json({ mensaje: 'Eliminar cliente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ClienteController();
