const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Message = sequelize.define('message', {
    msgid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Message;