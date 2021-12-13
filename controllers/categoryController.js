const categoryServise = require("../utils/service/categoryServise");
const CategoryServise = require("../utils/service/CategoryServise");
const {
  errorResponse,
  successResponse,
} = require("../utils/helpers/responsHelper");

exports.addCategory = async (req, res, next) => {
  try {
    await categoryServise.isCategoryExist(req.body.name);
    const category = await categoryServise.addCategory(req.body.name);
    successResponse(res, category, 201);
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    await CategoryServise.getCategoryById(req.params.id);
    const category = await CategoryServise.updateCategoryById(
      req.params.id,
      req.body
    );
    successResponse(res, category, 201);
  } catch (error) {
    next(error);
  }
};

exports.getAllCategory = async (req, res, next) => {
  try {
    const categorys = await categoryServise.getAllCategorys();
    successResponse(res, categorys);
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryServise.getCategoryById(req.params.id);
    successResponse(res, category);
  } catch (error) {
    next(error);
  }
};

exports.deleteCategoryById = async (req, res, next) => {
  try {
    await categoryServise.getCategoryById(req.params.id);
    const deletedcategory = await categoryServise.RemoveCategoryById(
      req.params.id
    );

    successResponse(res, deletedcategory._id, 201);
  } catch (error) {
    next(error);
  }
};
