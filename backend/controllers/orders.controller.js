const { models } = require('../models');

// get orders linked to logged in customer
exports.getOrders = async (req, res) => {
    if (!req.session) {return res.status(401).json({message: "You are not authorized to view orders"})};
    try {
        const orders = await models.User.findOne({where: {user_id: req.session.user_id},
            include: [
                {
                    model: models.Order,
                    include: [models.OrderItem],
                }
            ],
            attributes: {exclude: ['password_hash', 'is_active', 'phone_number']}
            }
        )
        if (!orders) {
            res.status(404).json({message: "You have no orders yet"})
        }
        res.json(orders);
    } catch (error) 
    {
        return res.status(500).json({error: "Internal server error"})
    }
}

exports.getOrder = async (req, res) => {
    if (!req.session) {return res.status(401).json({message: "You are not authorized to view orders"})};

    try {
        const order = await models.User.findOne({where: {user_id: req.session.user_id},
            include: [
                {
                    model: models.Order,
                    where: {order_id: req.params.id},
                    include: [models.OrderItem],
                }
            ],
            attributes: {exclude: ['password_hash', 'is_active', 'phone_number']}
            }
        )
        if (!order) {
            return res.status(404).json({message: "This order does not exist"})
        }
        res.json(order)

    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}