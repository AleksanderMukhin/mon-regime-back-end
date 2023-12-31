const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email allready in use")
  }

  // pered sohraneniem heshyu parol
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  const payload = {
    id: newUser._id,
  }

  const token = jwt.sign(payload, process.env.SICRET_KEY, { expiresIn: "23h" });
  //  записываю token в объект user
  await User.findByIdAndUpdate(newUser._id, { token })

  res.status(201).json({
    token,
    user: {
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt,
    }
  })
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })

  if (!user) {
    throw HttpError(401, "Email or password invalid")
  }

  // sravnivaem parol
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid")
  }

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, process.env.SICRET_KEY, { expiresIn: "23h" });
  //  записываю token в объект user
  await User.findByIdAndUpdate(user._id, { token })
  res.json({
    token,
  })
}

const getCurrent = async (req, res) => {
  // dannue user beretsja iz authenticate
  const { email, name } = req.user;

  res.json({
    email,
    name
  })
};

const logout = async (req, res) => {
  // dannue user beretsja iz authenticate
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success"
  })
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout)
};