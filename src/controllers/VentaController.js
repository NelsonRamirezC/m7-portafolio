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

        const t = await sequelize.transaction();

        try {
            //
            let { clienteId } = req.body;

            //VERIFICAR SI EXISTE CLIENTE
            const cliente = await Cliente.findByPk(clienteId, { transaction: t });
            if (!cliente){
                await t.rollback();
                return res.status(404).json({ mensjae: "Cliente no existe" });
            }

            //VER SI TIENE CARRITO
            const carrito = await Carrito.findAll({
                where: {
                    clienteId,
                },
            }, { transaction: t });

            if(carrito.length == 0){
                await t.rollback();
                return res.status(400).json({mensaje: "Cliente no tiene productos en carrito."});
            }

            //CREA VENTA
            const venta = await Venta.create({ clienteId }, { transaction: t });

            for (const data of carrito) {
                const detalle = data.dataValues;
                let { productoId, cantidad } = detalle;

                //ACTUALIZAR STOCKS
                let producto = await Producto.findByPk(productoId, { transaction: t });
                producto.stock = producto.stock - cantidad;

                await producto.save({ transaction: t });

                //CREAR LOS DETALLES
                await DetalleVenta.create({
                    ventaId: venta.id,
                    productoId,
                    cantidad,
                    precio: producto.precio,
                    descuento: producto.descuento,
                }, { transaction: t });
            }

            await Carrito.destroy({
                where: {clienteId},
            }, { transaction: t });

            let ventaDetalle = await Venta.findByPk(venta.id, {
                include: [
                    {
                        model: Cliente,
                        as: "cliente",
                    },
                    {
                        model: DetalleVenta,
                        as: "detalles",
                    },
                ],
            }, { transaction: t });

            await t.commit();

            res.json({ venta: ventaDetalle, mensaje: "ok" });

        } catch (error) {
            await t.rollback();
            console.log(error);
            res.status(500).json({ error: error.message });
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
