require('dotenv').config();
const express = require('express');
const path = require('path');
const { create } = require('express-handlebars');
const { sequelize } = require('./src/models/index.js');
const clientesRoutes = require('./src/routes/clientesRoutes');
const productosRoutes = require('./src/routes/productosRoutes');
const ventasRoutes = require('./src/routes/ventasRoutes');
const carritoRoutes = require('./src/routes/carritoRoutes');

const app = express();

// Configurar motor de vistas (Handlebars)
const hbs = create({
	partialsDir: [
		"views/partials/",
	],
});

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./src/views"));

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
  res.render('home', { titulo: 'Tienda Online' });
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
