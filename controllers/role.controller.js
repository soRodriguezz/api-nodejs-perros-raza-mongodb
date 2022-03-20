const Role = require("../models/Role");
const slugify = require("slugify");

exports.createRole = async (req, res) => {
  try {
    const { name, role } = req.body;
    const slug = slugify(req.body.name);

    const locateName = await Role.findOne({ name });
    const locateRole = await Role.findOne({ role });

    if (typeof name !== "string") {
      return res.status(400).json({ message: "Invalid data" });
    } else {
      if (locateName || locateRole) {
        return res
          .status(400)
          .json({ message: "Role or NameRole is already taken" });
      } else {
        const newRole = await new Role({ name, role, slug }).save();
        return res.status(200).json(newRole);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.listRoles = async (req, res) => {
  try {
    const roles = await Role.find({ status: "active" });
    return res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.searchRole = async (req, res) => {
  const role = await Role.findOne({
    slug: req.params.slug,
    status: "active",
  }).exec();

  if (!role) return res.status(404).json({ message: "Role not found" });

  return res.status(200).json(role);
};

exports.removeSoftRole = async (req, res) => {
  try {
    const { slug } = req.params;

    const deletedRole = await Role.findOneAndUpdate(
      { slug },
      { status: "active" },
      { new: true }
    );

    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    } else {
      return res.status(200).json(deletedRole);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
