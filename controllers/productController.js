const productServise = require("../utils/service/productServise");
const categoryServise = require("../utils/service/categoryServise");
const {
  errorResponse,
  successResponse,
} = require("../utils/helpers/responsHelper");
const { havePermission } = require("../utils/helpers/havePermission");

exports.addProduct = async (req, res, next) => {
  try {
    await categoryServise.getCategoryById(req.body.category);
    const product = await productServise.addProduct(req.body);
    successResponse(res, product, 201);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    await productServise.getProductById(req.params.id);
    const product = await productServise.updateProductById(
      req.params.id,
      req.body
    );
    successResponse(res, product);
  } catch (error) {
    next(error);
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await productServise.getAllProduct();
    successResponse(res, products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productServise.getProductById(req.params.id);
    successResponse(res, product);
  } catch (error) {
    next(error);
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const product = await productServise.getProductById(req.params.id);
    await havePermission(req, product.userId);

    const deletedproduct = await productServise.RemoveProductById(
      req.params.id
    );
    successResponse(res, deletedproduct._id, 201);
  } catch (error) {
    next(error);
  }
};
