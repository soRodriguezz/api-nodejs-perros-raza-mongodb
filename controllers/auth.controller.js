const User = require("../models/User");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res) => {

  const { email, password } = req.body;
  
  if(email === '' || password === '') return res.status(400).json({message: "Todos los campos son requeridos"});

  const userFound = await User.findOne({email}).populate("roles");

  if(!userFound) return res.status(400).json({message: "User not found"});

  const matchPassword = await User.comparePassword(password, userFound.password);

  if(!matchPassword) return res.status(401).json({token: null, message: "Contraseña o correo incorrectos"});

  const token = jwt.sign({id: userFound._id}, process.env.SECRET, {
    expiresIn: 900,
  });

  return res.json({token});
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  if ( username === '' || email === '' ||  password === '') {
    return res.status(400).json({message: "Todos los campos son requeridos"});
  }

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  const role = await Role.find({ name: "user" });
  newUser.roles = role[0]._id;

  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
    expiresIn: 900,
  });

  res.status(200).json({ token });
};

