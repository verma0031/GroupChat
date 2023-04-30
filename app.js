const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');
require('dotenv').config();
const bodyParser = require('body-parser');

const User = require('./model/user');

const userRoutes = require('./routes/user')


const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use('/user', userRoutes);



sequelize.sync()
.then( () => {
    app.listen(4000);
})
.catch( err => console.log(err));