const User = require("../../models/userModel");
const { ErrorHandler } = require("../helpers/errorHelper");

const bcrypt = require("bcryptjs");
const {
  registerValidation,
  loginValidation,
} = require("../../middleware/validation");

exports.addUser = async (data) => {
  const newUser = await createUserObj(data);
  return await User.create(newUser);
};
exports.getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new ErrorHandler(404, "user not found! ");
  return user;
};
exports.getUserByEmailWithPassword = async (email) => {
  const user = User.findOne({ email }).select("+password");
  if (!user) throw new ErrorHandler(404, "user not found! ");
  return user;
};
exports.getUserById = async (_id) => {
  const user = await User.findById(_id);
  if (!user) throw new ErrorHandler(404, "user not found! ");
  return user;
};
exports.getAllUsers = async () => {
  return await User.find({});
};
exports.updateUserById = async (_id, data) => {
  return await User.findByIdAndUpdate(_id, { $set: data }, { new: true });
};
exports.RemoveUserById = async (_id) => {
  return await User.findByIdAndRemove(_id);
};

exports.isNewUser = async (email) => {
  const user = await User.findOne({ email });
  if (user) throw new ErrorHandler(400, "Customer already exist!");
};
exports.isRegisterDataValide = async (data) => {
  const { error, value } = registerValidation(data);
  if (error) throw new ErrorHandler(400, error.details[0].message);
};
exports.isLogInDataValide = async (data) => {
  const { error, value } = loginValidation(data);
  if (error) throw new ErrorHandler(400, error.details[0].message);
};

const createUserObj = async (req) => {
  return {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
  };
};
