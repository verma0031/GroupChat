const express = require('express');
const cors = require('cors');
const sequelize = require('./util/database');
require('dotenv').config();
const bodyParser = require('body-parser');

const User = require('./model/user');
const Message = require('./model/message');
const Group = require('./model/group');
const GroupMembership = require('./model/groupMembership');

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const groupRoutes = require('./routes/group');


const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use('/user', userRoutes);
app.use('/user', messageRoutes);
app.use('/groups', groupRoutes);


User.hasMany(Message);
Message.belongsTo(User);

Group.hasMany(Message);
Message.belongsTo(Group);

User.belongsToMany(Group, { through: GroupMembership });
Group.belongsToMany(User, { through: GroupMembership });


sequelize.sync()
.then( () => {
    app.listen(4000);
})
.catch( err => console.log(err));