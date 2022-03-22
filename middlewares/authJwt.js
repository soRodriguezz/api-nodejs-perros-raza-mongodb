const Role = require("../models/Role");
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"];
    try {
        if (!token) return res.status(403).json({error: "No token provided"});

        const decoded = jwt.verify(token, process.env.SECRET);

        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });
        if(!user) return res.status(404).json({error: "User not found"});

        next();
    } catch (err) {
        return res.status(500).json({err});
    }
};

exports.isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});

    for(let i = 0; i < roles.length; i++) {
        if(roles[i].name === "admin") {
            next();
            return;
        }
    }
    return res.status(403).json({error: "You are not a admin"});
};

exports.isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});

    for(let i = 0; i < roles.length; i++) {
        if(roles[i].name === "moderator") {
            next();
            return;
        }
    }
    return res.status(403).json({error: "You are not a moderator"});
};