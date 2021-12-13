const productServise = require("../utils/service/productServise");
const cartServise = require("../utils/service/cartServise");
const Cart = require("../models/cartModels");

const { successResponse } = require("../utils/helpers/responsHelper");

exports.addProductTocart = async (req, res, next) => {
  try {
    const productExist = await productServise.getProductById(
      req.body.productId
    );

    const cart = await cartServise.addProductTocart(req.userId, req.body);
    successResponse(res, cart, 201);
  } catch (error) {
    next(error);
  }
};

// don
exports.getCart = async (req, res, next) => {
  try {
    const cart = await cartServise.getCart(req.userId);
    successResponse(res, cart);
  } catch (error) {
    next(error);
  }
};
// don
exports.emptyCart = async (req, res, error) => {
  try {
    const cartEmpty = await cartServise.emptyCart();
    successResponse(res, [], 201);
  } catch (error) {
    next(error);
  }
};

exports.RemoveProductfromeCart = async (req, res) => {
  try {
    const deletedproduct = await cartServise.RemoveProductfromeCart(
      req.userId,
      req.params.id
    );
    successResponse(res, deletedproduct._id, 201);
  } catch (error) {
    next(error);
  }
};
