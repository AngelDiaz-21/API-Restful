const express = require ('express');
const router = express.Router();
const sequelize = require('../config/db');

// * Get all users
router.get('/', async (request, response) => {
    return await sequelize.models.users.findAndCountAll()
        .then(data => response.json(data))
        .catch(err => response.json({message: 'Error', data: err}))
});

// * Create User
router.post('/', async (request, response) => {
    const { body } = request;
    const user = await sequelize.models.users.create({
        name: body.name,
        firstSurname: body.firstSurname,
        secondSurname: body.secondSurname,
        typeUser: body.typeUser,
        email: body.email,
        password: body.password
    });
    await user.save();
    return response.status(201).json({ data: user});
});

// * Update a user by id
router.put('/:id', async (request, response) => {
    const {body, params: {id}} = request;
    const user = await sequelize.models.users.findByPk(id);
    if(!user){
        return response.status(404).json({code: 404, message: 'Product not found'});
    }
    const updatedUser = await user.update({
        name: body.name,
        firstSurname: body.firstSurname,
        secondSurname: body.secondSurname,
        typeUser: body.typeUser,
        email: body.email,
        password: body.password
    });
    return response.json({data: updatedUser});
});

// * Delete a user by id
router.delete('/:id', async (request, response) => {
    const {params: {id}} = request;
    const user = await sequelize.models.users.findByPk(id);
    if(!user){
        return response.status(404).json({ code: 404, message: 'User not found'});
    }
    await user.save();
    return response.json();
});

module.exports = router;