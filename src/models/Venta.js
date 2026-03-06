const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Venta = sequelize.define(
    'Venta',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      hora: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id'
        }
      }
    },
    {
      tableName: 'ventas',
      timestamps: true
    }
  );

  return Venta;
};
