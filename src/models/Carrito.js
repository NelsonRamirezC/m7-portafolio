const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Carrito = sequelize.define(
    'Carrito',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id'
        }
      },
      productoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'productos',
          key: 'id'
        }
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      }
    },
    {
      tableName: 'carritos',
      timestamps: true
    }
  );

  return Carrito;
};
