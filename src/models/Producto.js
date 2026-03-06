const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Producto = sequelize.define(
    'Producto',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0
        }
      },
      descuento: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100
        }
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0
        }
      }
    },
    {
      tableName: 'productos',
      timestamps: true
    }
  );

  return Producto;
};
