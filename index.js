require('dotenv').config();
const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const clientesRoutes = require('./routes/clientesRoutes');
const productosRoutes = require('./routes/productosRoutes');
const ventasRoutes = require('./routes/ventasRoutes');
const carritoRoutes = require('./routes/carritoRoutes');

const app = express();

// Configurar motor de vistas (Handlebars)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.use('/api/clientes', clientesRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/carrito', carritoRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.render('index', { titulo: 'Tienda Online' });
});

// Sincronizar base de datos y iniciar servidor
const PORT = process.env.PORT || 3000;

async function iniciar() {
  try {
    // Sincronizar modelos con la base de datos
    await sequelize.sync({ force: true, alter: true, });
    console.log('✓ Base de datos sincronizada correctamente');

    app.listen(PORT, () => {
      console.log(`✓ Servidor iniciado en puerto ${PORT}`);
      console.log(`✓ Abre http://localhost:${PORT} en tu navegador`);
    });
  } catch (error) {
    console.error('✗ Error al iniciar la aplicación:', error);
    process.exit(1);
  }
}

iniciar();

module.exports = app;
