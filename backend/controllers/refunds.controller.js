const { models, sequelize } = require('../models');

exports.createRefund = async (req, res) => {
    const { order_id, order_items, refund_reason } = req.body;
    const transaction = await sequelize.transaction();
    let totalRefundPrice = 0;

    // Validation checks
    if (!req.session) {
        return res.status(401).json({ message: "You are not authorized to view refunds" });
    }
    if (!order_id) {
        return res.status(401).json({ message: "You are not authorized to refund this order" });
    }
    if (!order_items || !refund_reason) {
        return res.status(401).json({ message: "Please fill in all required fields." });
    }

    try {
        // Find order with payment
        const order = await models.Order.findOne({
            where: { order_id: order_id },
            include: [{ model: models.Payment, as: "Payment" }]
        });

        if (!order) {
            await transaction.rollback();
            return res.status(404).json({ error: "Order not found" });
        }

        // Create refund
        const refund = await models.Refund.create({
            reason: refund_reason,
            restock_items: false,
            OrderOrderId: order.order_id,
            PaymentPaymentId: order.Payment.payment_id
        }, { transaction });

        // Process refund items - use Promise.all with async/await instead of forEach
        await Promise.all(order_items.map(async (item) => {
            const refund_product = await models.OrderItem.findOne({
                where: { order_item_id: item.order_item_id }
            });

            if (!refund_product) {
                throw new Error(`Ordered item ${item.order_item_id} not found`);
            }

            totalRefundPrice += parseInt(refund_product.price_at_purchase) * item.quantity;

            await models.RefundItem.create({
                quantity: item.quantity, // Fixed from order_items.quantity
                OrderItemOrderItemId: item.order_item_id,
                RefundRefundId: refund.refund_id
            }, { transaction });
        }));

        // Update refund with total amount
        await models.Refund.update(
            { amount: totalRefundPrice },
            { where: { refund_id: refund.refund_id }, transaction }
        );

        // Update order status
        await models.Order.update(
            { status: "pending" },
            { where: { order_id: order_id }, transaction }
        );

        // Update payment status
        const paymentStatus = totalRefundPrice === order.total_amount ? "refund" : "partialrefund";
        await models.Payment.update(
            { status: paymentStatus },
            { where: { payment_id: order.Payment.payment_id }, transaction }
        );

        await transaction.commit();
        res.json({ message: "You have successfully created a refund request." });

    } catch (error) {
        await transaction.rollback();
        console.log(error);
        res.status(500).json({ error: "Could not create refund request." });
    }
};