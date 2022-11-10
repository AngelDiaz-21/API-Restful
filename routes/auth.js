const express = require('express')
const router = express.Router()
const sequelize = require('../config/db');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { body } = req;
    // Busca al usuario por el email
    const user = await sequelize.models.users.findOne({
        where: {
            email: body.email
        }
    })
    // Validaciones
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    if (!user.validPassword(body.password)) return res.status(401).json({ message: 'Invalid credentials' });

    // JWT
    const token = jwt.sign({ userId: user.id }, 'secretKey', {
        expiresIn: 3600 // segundos
    });

    return res.json({
        message: 'Athenticated successfully!', token
    })
})

router.post('/signup', async (req, res) => {
    const { body } = req;
    let user = await sequelize.models.users.findOne({
        where: { email: body.email },
    });

    // Validation for known is the user's email exists
    if (user) {
        return res.status(400).json({ message: "this email is already registered" });
    }

    // Creating the user
    user = await sequelize.models.users.create({
        name: body.name,
        lastname: body.lastname,
        firstSurname: body.firstSurname,
        secondSurname: body.secondSurname,
        email: body.email,
        password: body.password,
        type: 'client',
    })

    return res.json({ message: 'Your account was created successfully' });
})

module.exports = router