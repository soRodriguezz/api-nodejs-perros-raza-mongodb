const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res) => {
    const userFound = await User.findOne({email: req.body.email}).populate("roles");

    if(!userFound) return res.status(400).json({message: "User not found"});

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);

    if(!matchPassword) return res.status(401).json({token: null, message: "Password incorrect"});

    const token = jwt.sign({id: userFound._id}, process.env.SECRET, {
        expiresIn: 900,
    });

    res.json({token});
};