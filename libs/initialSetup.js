const Role = require("../models/Role");
const User = require("../models/User");

exports.createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: "user", slug: "user" }).save(),
      new Role({ name: "moderator", slug: "moderator" }).save(),
      new Role({ name: "admin", slug: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

exports.createUserAdmin = async () => {
  try {
    const count = await User.estimatedDocumentCount();

    if (count > 0) return;

    const values = new User({
      username: "sorz",
      email: "sorz@gmail.com",
      password: "qwerty"
    });

    values.roles = await Role.find({ name: "admin" });

    await values.save();
  } catch (error) {
    console.error(error);
  }
};
