const {
    Venta,
    Cliente,
    Carrito,
    Producto,
    DetalleVenta,
    sequelize
} = require("../models/index.js");

// Controlador de Ventas
class VentaController {
    async listar(req, res) {
        try {
            // TODO: Implementar lógica
            let ventas = await Venta.findAll();
            res.json({ ventas, mensaje: "ok" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async obtener(req, res) {
        try {
            // TODO: Implementar lógica
            res.json({ mensaje: "Obtener venta" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

async crear(req, res) {
    try {
        const { clienteId } = req.body;

        // Utilizamos "Managed Transactions" (transacciones gestionadas)
        // Sequelize hace commit o rollback automáticamente si hay un error (throw)
        const ventaResult = await sequelize.transaction(async (t) => {
            
            // 1. VERIFICAR SI EXISTE CLIENTE
            const cliente = await Cliente.findByPk(clienteId, { transaction: t });
            if (!cliente) {
                throw new Error("CLIENTE_NO_ENCONTRADO");
            }

            // 2. VER SI TIENE CARRITO (Corrección: 'transaction' va dentro del mismo objeto que 'where')
            const carrito = await Carrito.findAll({
                where: { clienteId },
                transaction: t
            });

            if (carrito.length === 0) {
                throw new Error("CARRITO_VACIO");
            }

            // 3. CREAR VENTA
            const venta = await Venta.create({ clienteId }, { transaction: t });

            const detallesVenta = [];

            // 4. VALIDAR STOCK Y PREPARAR DETALLES
            for (const item of carrito) {
                const { productoId, cantidad } = item;

                // Bloqueamos la fila (FOR UPDATE) para evitar condiciones de carrera si dos usuarios compran al mismo tiempo
                const producto = await Producto.findByPk(productoId, { 
                    transaction: t,
                    lock: t.LOCK.UPDATE
                });

                if (!producto) {
                    throw new Error(`PRODUCTO_NO_EXISTE`);
                }

                if (producto.stock < cantidad) {
                    throw new Error(`STOCK_INSUFICIENTE`);
                }

                // Descontar stock de forma atómica
                await producto.decrement('stock', { by: cantidad, transaction: t });

                // Almacenar en el array para insertar de forma masiva después
                detallesVenta.push({
                    ventaId: venta.id,
                    productoId,
                    cantidad,
                    precio: producto.precio,
                    descuento: producto.descuento || 0
                });
            }

            // 5. CREAR TODOS LOS DETALLES EN UNA SOLA CONSULTA (Optimización de rendimiento)
            await DetalleVenta.bulkCreate(detallesVenta, { transaction: t });

            // 6. VACIAR CARRITO (Corrección de sintaxis)
            await Carrito.destroy({
                where: { clienteId },
                transaction: t
            });

            // 7. RETORNAR VENTA CON DETALLES (Corrección: 'transaction' va en el segundo argumento junto con 'include')
            const ventaDetalle = await Venta.findByPk(venta.id, {
                include: [
                    { model: Cliente, as: "cliente" },
                    { model: DetalleVenta, as: "detalles" }
                ],
                transaction: t
            });

            return ventaDetalle;
        });

        // Si la transacción fue exitosa, respondemos al cliente
        return res.json({ venta: ventaResult, mensaje: "ok" });

    } catch (error) {
        // Manejo de errores controlados
        if (error.message === "CLIENTE_NO_ENCONTRADO") {
            return res.status(404).json({ mensaje: "Cliente no existe" });
        }
        if (error.message === "CARRITO_VACIO") {
            return res.status(400).json({ mensaje: "Cliente no tiene productos en carrito." });
        }
        if (error.message === "STOCK_INSUFICIENTE") {
            return res.status(400).json({ mensaje: "Stock insuficiente para uno de los productos en el carrito." });
        }
        if (error.message === "PRODUCTO_NO_EXISTE") {
            return res.status(404).json({ mensaje: "Un producto en el carrito ya no existe en la base de datos." });
        }

        // Errores no controlados (servidor, base de datos)
        console.error("Error al crear la venta:", error);
        return res.status(500).json({ error: error.message });
    }
}


    async actualizar(req, res) {
        try {
            // TODO: Implementar lógica
            res.json({ mensaje: "Actualizar venta" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async eliminar(req, res) {
        try {
            // TODO: Implementar lógica
            res.json({ mensaje: "Eliminar venta" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new VentaController();
