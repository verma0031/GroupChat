const Group = require("../model/group");
const User = require("../model/user");

exports.createGroup = async (req, res) => {
    try {
      const user = req.user;
      const { groupName } = req.body;
      const group = await Group.create({ name: groupName });
      await group.addUser(user, { through: { isAdmin: true } });
      res.json(group);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };