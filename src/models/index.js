const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Importar los modelos
const ClienteModel = require('./Cliente');
const ProductoModel = require('./Producto');
const VentaModel = require('./Venta');
const DetalleVentaModel = require('./DetalleVenta');
const CarritoModel = require('./Carrito');

// Inicializar los modelos
const Cliente = ClienteModel(sequelize);
const Producto = ProductoModel(sequelize);
const Venta = VentaModel(sequelize);
const DetalleVenta = DetalleVentaModel(sequelize);
const Carrito = CarritoModel(sequelize);

// Definir relaciones
// Cliente - Venta: 1 a muchos
Cliente.hasMany(Venta, {
  foreignKey: 'clienteId',
  as: 'ventas'
});

Venta.belongsTo(Cliente, {
  foreignKey: 'clienteId',
  as: 'cliente'
});

// Venta - Producto: Muchos a muchos a través de DetalleVenta
Venta.hasMany(DetalleVenta, {
  foreignKey: 'ventaId',
  as: 'detalles'
});

DetalleVenta.belongsTo(Venta, {
  foreignKey: 'ventaId',
  as: 'venta'
});

Producto.hasMany(DetalleVenta, {
  foreignKey: 'productoId',
  as: 'detallesVentas'
});

DetalleVenta.belongsTo(Producto, {
  foreignKey: 'productoId',
  as: 'producto'
});

// Cliente - Carrito: 1 a muchos
Cliente.hasOne(Carrito, {
  foreignKey: 'clienteId',
  as: 'carrito'
});

Carrito.belongsTo(Cliente, {
  foreignKey: 'clienteId',
  as: 'cliente'
});

// Carrito - Producto: Muchos a muchos
Producto.hasMany(Carrito, {
  foreignKey: 'productoId',
  as: 'carrito'
});

Carrito.belongsTo(Producto, {
  foreignKey: 'productoId',
  as: 'producto'
});

module.exports = {
  sequelize,
  Cliente,
  Producto,
  Venta,
  DetalleVenta,
  Carrito
};
