const { Sequelize } = require('sequelize')

const productModel = require('../models/product')
const reviewModel = require('../models/review')

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
)

const models = [productModel, reviewModel]

for (let model of models)
    model(sequelize)

//Configuring relations
// Se desestructuran pero utilizando el nombre de las tablas que se encuentran en la base de datos
const { products, reviews } = sequelize.models;
reviews.belongsTo(products); // Relation one-to-one in reviews table

module.exports = sequelize