const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DetalleVenta = sequelize.define(
    'DetalleVenta',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ventaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ventas',
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
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      descuento: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 0
      }
    },
    {
      tableName: 'detalle_ventas',
      timestamps: true
    }
  );

  return DetalleVenta;
};
