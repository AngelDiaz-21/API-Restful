const express = require('express');
const router = express.Router();
const sequelize = require('../config/db');

// * Get all reviews
router.get('/', async (request, response) => {
    return await sequelize.models.reviews.findAndCountAll()
        .then((data) => response.json(data) )
        .catch((err) => response.json({ message: 'Error', data: err}));
});

// * Create a new review
router.post('/', async (request, response) => {
    const { body } = request;
    const review = await sequelize.models.reviews.create({
        content: body.content,
        productId: body.productId
    });
    await review.save();
    return response.status(201).json({data: review});
});

// * Update a review by id
router.put('/:id', async (request, response) => {
    const {body, params: { id }} = request;
    const review = await sequelize.models.reviews.findByPk(id);
    if(!review){
        return response.status(404).json({ code: 404, message: 'Review not found'});
    }
    const updatedReview = await review.update({
        content: body.content,
        productId: body.productId
    });
    return response.json({data: updatedReview});
});

// * Delete a product by id
router.delete('/:id', async (request, response) => {
    const { params: { id }} = request;
    const review = await sequelize.models.reviews.findByPk(id);
    if(!review){
        return response.status(404).json({ code: 404, message: 'Review not found'});
    }
    await review.save();
    return response.json();
});

module.exports = router;