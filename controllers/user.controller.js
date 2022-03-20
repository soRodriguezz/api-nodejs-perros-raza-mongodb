const User = require("../models/User");
const Role = require("../models/Role");

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const existUsername = await User.findOne({ username });
    const existEmail = await User.findOne({ email });

    if (existEmail || existUsername) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const newUser = new User({
      username,
      email,
      password,
      roles,
    });

    newUser.password = await User.encryptPassword(password);
    newUser.roles = await Role.find({ name: roles });

    if (newUser.roles.length === 0) {
      newUser.roles = await Role.find({ name: "user" });
    }

    await newUser.save();
    res.status(200).json({
      message: "User created",
      data: {
        username,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "active" });
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};
