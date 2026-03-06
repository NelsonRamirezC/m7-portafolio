// Controlador de Productos
class ProductoController {
  async listar(req, res) {
    try {
      // TODO: Implementar lógica
      res.json({ mensaje: 'Listar productos' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtener(req, res) {
    try {
      // TODO: Implementar lógica
      res.json({ mensaje: 'Obtener producto' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async crear(req, res) {
    try {
      // TODO: Implementar lógica
      res.json({ mensaje: 'Crear producto' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      // TODO: Implementar lógica
      res.json({ mensaje: 'Actualizar producto' });
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
