const { Sequelize } = require('sequelize')

// Importing models
const productModel = require('../models/product')
const reviewModel = require('../models/review')
const userModel = require('../models/user')
const orderModel = require('../models/order')

// Database connection
const sequelize = new Sequelize(
    'sesion6',
    'root',
    'Nextapple18',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        logging: false
    }
);

// Getting models
const models = [productModel, reviewModel, userModel, orderModel]

// Registering models into sequelize
for (let model of models)
    model(sequelize)

//Configuring relations
// Se desestructuran pero utilizando el nombre de las tablas que se encuentran en la base de datos
const { products, reviews, orders, users } = sequelize.models;
reviews.belongsTo(products); // Relation one-to-one in reviews table
orders.belongsTo(products);
orders.belongsTo(users);

module.exports = sequelize