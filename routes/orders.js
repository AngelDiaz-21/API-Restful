const express = require('express');
const router = express.Router();
const sequelize = require('../config/db');

// * Get all orders
router.get('/', async(request, response) => {
    return await sequelize.models.orders.findAndCountAll()
        .then(data=> response.json(data))
        .catch(err => response.json({ message: 'Error', data: err}));
});

// * Create order
router.post('/', async (request, response) => {
    const {body} = request;
    const order = await sequelize.models.orders.create({
        productId: body.productId,
        userId: body.userId,
        numberOfProductsAdded: body.numberOfProductsAdded
    });
    await order.save();
    return response.status(201).json({ data: order });
});

// * Update a order by id
router.put('/:id', async(request, response) => {
    const { body, params: {id}} = request;
    const order = await sequelize.models.orders.findByPk(id);
    if(!order){
        return response.status(404).json({ code: 404, message: 'Order not found'});
    }
    const updatedOrder = await order.update({
        productId: body.productId,
        userId: body.userId,
        numberOfProductsAdded: body.numberOfProductsAdded
    });
    return response.json({ data: updatedOrder});
});

// * Delete  a order by id
router.delete('/:id', async (request, response) => {
    const { params: {id}} = request;
    const order = await sequelize.models.orders.findByPk(id);
    if(!order){
        return response.status(404).json({ code: 404, message: 'Order not found'});
    }
    await order.destroy();
    return response.json();
});

module.exports = router;