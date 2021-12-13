const bcrypt = require("bcryptjs");

const userServise = require("../utils/service/userServise");
const { successResponse } = require("../utils/helpers/responsHelper");
const { creatJWT, creatAdminJWT } = require("../utils/helpers/jwt");
const { comparePassword } = require("../utils/helpers/comparePassword");

exports.signUp = async (req, res, next) => {
  try {
    await userServise.isRegisterDataValide(req.body);
    await userServise.isNewUser(req.body.email);
    const user = await userServise.addUser(req);
    successResponse(res, user, 201);
  } catch (error) {
    next(error);
  }
};

exports.logIn = async (req, res, next) => {
  try {
    await userServise.isLogInDataValide(req.body);
    const user = await userServise.getUserByEmailWithPassword(req.body.email);
    await comparePassword(req.body.password, user.password);
    // create and assign jwt
    const token = creatJWT(foundUser._id);
    successResponse(res, { user, token });
  } catch (error) {
    next(error);
  }
};

exports.logOut = async (req, res) => {
  return res
    .status(200)
    .header("auth-token", "")
    .json(successResponse("", "logOut Successfully!"));
};

// Admin
exports.signUpAdmin = async (req, res) => {
  try {
    await userServise.isRegisterDataValide(req.body);
    await userServise.isNewUser(req.body.email);
    const user = await userServise.addUser(req);
    successResponse(res, user, 201);
  } catch (error) {
    next(error);
  }
};

// exports.logInAdmin = async (req, res) => {
//   try {
//     await userServise.isLogInDataValide(req.body);
//     // check if user is exist or not
//     const user = await userServise.getUserByEmailWithPassword(req.body.email);
//     // check is password correct or not
//     await comparePassword(req.body.password, user.password);
//     // create and assign jwt
//     const token = creatAdminJWT(foundUser._id);
//     const userResponse = sendUserdata(foundUser);

//     return res
//       .status(200)
//       .header("admin-token", token)
//       .json(loginSuccessResponse(userResponse, "login Successfully!", token));
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(errorResponse("somting wos rong pless try agin", 400));
//   }
// };

// exports.logOutAdmin = async (req, res) => {
//   return res
//     .status(200)
//     .header("admin-token", "")
//     .json(successResponse("", "logOut Successfully!"));
// };

// to ignor password in response
