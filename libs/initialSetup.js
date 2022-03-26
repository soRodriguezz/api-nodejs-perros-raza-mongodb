const Role = require("../models/Role");
const User = require("../models/User");

exports.createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    await Promise.all([
      new Role({ name: "user", slug: "user" }).save(),
      new Role({ name: "moderator", slug: "moderator" }).save(),
      new Role({ name: "admin", slug: "admin" }).save(),
    ]);

    console.log('Roles creados');
  } catch (error) {
    console.error(error);
  }
};

exports.createUserAdmin = async () => {
  try {
    const count = await User.estimatedDocumentCount();

    if (count > 0) return;

    await Promise.all([
      new User({
        username: "sorz",
        email: "sorz@gmail.com",
        password: await User.encryptPassword("qwerty"),
        roles: await Role.find({ name: "admin" })
      }).save()
    ]);

    console.log('Usuario admin creado ');
  } catch (error) {
    console.error(error);
  }
};
