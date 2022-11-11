const express = require ('express');
const router = express.Router();
const sequelize = require('../config/db');
const permission = require ('../middlewares/permission');

// * Get all products
router.get('/', permission('admin', 'cliente'), async (request, response) => {
    return await sequelize.models.products.findAndCountAll()
        .then(data => response.json(data))
        .catch(err => response.json({ message: 'Error', data: err}));
});

// * Create a new product
router.post('/', async (request, response) => {
    const { body } = request;
    const product = await sequelize.models.products.create({
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image
    });
    await product.save();
    return response.status(201).json({ data: product });
});

// * Update a product by id
router.put('/:id', async (request, response) => {
    const {body, params: { id } } = request;
    const product = await sequelize.models.products.findByPk(id);
    if(!product){
        return response.status(404).json({ code: 404, message: 'Product not found'});
    }
    const updatedProduct = await product.update({
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image
    });
    return response.json({ data: updatedProduct});
});

// * Delete a product by id
router.delete('/:id', async (request, response) => {
    const { params: { id }} = request;
    const product = await sequelize.models.products.findByPk(id);
    if(!product){
        return response.status(404).json({ code: 404, message: 'Product not found'});
    }
    await product.destroy();
    return response.json();
});

module.exports = router;