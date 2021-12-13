const userServise = require("../utils/service/userServise");
const { successResponse } = require("../utils/helpers/responsHelper");

exports.updateUser = async (req, res, next) => {
  try {
    const userExist = await userServise.getUserById(req.params.id);
    await havePermission(req, userExist._id);
    const user = await userServise.updateUserById(req.params.id, req.body);
    successResponse(res, user, 201);
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userServise.getAllUsers();
    successResponse(res, users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await userServise.getUserById(req.params.id);

    successResponse(res, user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    const userExist = await userServise.getUserById(req.params.id);
    await havePermission(req, userExist._id);
    const user = await userServise.RemoveUserById(req.params.id);
    successResponse(res, userExist._id);
  } catch (error) {
    next(error);
  }
};
