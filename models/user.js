// /models/user.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('users', {
        id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        firstSurname: DataTypes.STRING,
        secondSurname: DataTypes.STRING,
        typeUser: DataTypes.STRING,
        email: {
        type: DataTypes.STRING,
        unique: true
        },
        password: DataTypes.STRING,
        createAt: DataTypes.DATE,
        updateAt: DataTypes.DATE
}, {
});

return User;
};