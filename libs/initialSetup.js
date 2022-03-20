const Role = require ("../models/Role");
const slugify = require("slugify");

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
