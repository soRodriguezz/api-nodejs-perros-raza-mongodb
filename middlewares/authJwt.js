const Role = require("../models/Role");
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"];
    try {
        if (!token) return res.status(403).json({error: "No se proporcionó token"});

        const decoded = jwt.verify(token, process.env.SECRET);

        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });
        if(!user) return res.status(404).json({error: "Usuario no encontrado"});

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
    return res.status(403).json({error: "No tienes permisos de administrador"});
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
    return res.status(403).json({error: "No tienes permisos de moderador"});
};
