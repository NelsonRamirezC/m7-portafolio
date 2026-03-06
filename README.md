# Estructura MVC - Sistema de Tienda Online con Sequelize

## Descripción
Este proyecto implementa una estructura MVC completa con modelos Sequelize para un sistema de tienda online.

## Estructura de Carpetas

```
m7-portafolio/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración de Sequelize
│   ├── models/
│   │   ├── Cliente.js           # Modelo de clientes
│   │   ├── Producto.js          # Modelo de productos
│   │   ├── Venta.js             # Modelo de ventas
│   │   ├── DetalleVenta.js      # Tabla pivote ventas-productos
│   │   ├── Carrito.js           # Modelo de carrito
│   │   └── index.js             # Inicialización y relaciones
│   ├── controllers/
│   │   ├── ClienteController.js  # Controlador de clientes
│   │   ├── ProductoController.js # Controlador de productos
│   │   ├── VentaController.js    # Controlador de ventas
│   │   └── CarritoController.js  # Controlador de carrito
│   ├── routes/
│   │   ├── clientesRoutes.js     # Rutas de clientes
│   │   ├── productosRoutes.js    # Rutas de productos
│   │   ├── ventasRoutes.js       # Rutas de ventas
│   │   └── carritoRoutes.js      # Rutas de carrito
│   └── views/
│       └── index.hbs            # Vista principal
├── public/                       # Archivos estáticos
├── index.js                     # Punto de entrada
├── .env.example                 # Variables de entorno
└── package.json
```

## Modelos y Relaciones

### Cliente
- Campos: id, nombre, apellido, correo
- Relaciones:
  - ✅ 1 a Muchos con Venta
  - ✅ 1 a Muchos con Carrito

### Producto
- Campos: id, nombre, precio, descuento, descripcion, stock
- Relaciones:
  - ✅ 1 a Muchos con DetalleVenta
  - ✅ 1 a Muchos con Carrito

### Venta
- Campos: id, fecha, hora, clienteId
- Relaciones:
  - ✅ Muchos a 1 con Cliente
  - ✅ 1 a Muchos con DetalleVenta

### DetalleVenta (Tabla Pivote)
- Campos: id, ventaId, productoId, cantidad, precio, descuento
- Tabla intermediaria entre Venta y Producto (Muchos a Muchos)

### Carrito
- Campos: id, clienteId, productoId, cantidad
- Relaciones:
  - ✅ Muchos a 1 con Cliente
  - ✅ Muchos a 1 con Producto

## Configuración

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Crear archivo .env:**
   ```bash
   cp .env.example .env
   ```
   
   Actualizar con tus credenciales de PostgreSQL:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=tienda_db
   ```

3. **Crear la base de datos en PostgreSQL:**
   ```sql
   CREATE DATABASE tienda_db;
   ```

4. **Iniciar el servidor:**
   ```bash
   npm start
   ```
   o
   ```bash
   node index.js
   ```

## Rutas API

### Clientes
- GET `/api/clientes` - Listar clientes
- GET `/api/clientes/:id` - Obtener cliente
- POST `/api/clientes` - Crear cliente
- PUT `/api/clientes/:id` - Actualizar cliente
- DELETE `/api/clientes/:id` - Eliminar cliente

### Productos
- GET `/api/productos` - Listar productos
- GET `/api/productos/:id` - Obtener producto
- POST `/api/productos` - Crear producto
- PUT `/api/productos/:id` - Actualizar producto
- DELETE `/api/productos/:id` - Eliminar producto

### Ventas
- GET `/api/ventas` - Listar ventas
- GET `/api/ventas/:id` - Obtener venta
- POST `/api/ventas` - Crear venta
- PUT `/api/ventas/:id` - Actualizar venta
- DELETE `/api/ventas/:id` - Eliminar venta

### Carrito
- GET `/api/carrito/:clienteId` - Listar carrito del cliente
- POST `/api/carrito` - Agregar producto al carrito
- PUT `/api/carrito/:id` - Actualizar item del carrito
- DELETE `/api/carrito/:id` - Eliminar item del carrito
- DELETE `/api/carrito/:clienteId/vaciar` - Vaciar carrito

## Próximos Pasos

1. Completar la lógica en los controladores
2. Agregar validación de datos
3. Implementar manejo de errores
4. Crear vistas con Handlebars
5. Agregar autenticación
6. Implementar carrito de compras completo
