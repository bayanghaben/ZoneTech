const Product = require("../models/ProductModel");
const APIFeatures = require("../utils/apiFeatures");

exports.aliasSixProducts = (req, res, next) => {
  req.query.limit = "6";
  next();
};

exports.getSixProducts = async (req, res) => {
  try {
    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const products = await features.query;

    res.status(200).json({
      status: "success",
      data: {
        products: products,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categoriesObj = {};
    const allCategories = await Product.find();
    allCategories.forEach((ele) => {
      categoriesObj[ele.category] = ele.category;
    });
    const allCategoriesToBeSent = Object.keys(categoriesObj);
    res.status(200).json({
      status: "success",
      data: {
        allCategories: allCategoriesToBeSent,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    let productsNumber;
    if (req.query.category) {
      productsNumber = await Product.countDocuments({
        category: req.query.category,
      });
    } else {
      productsNumber = await Product.countDocuments();
    }
    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const products = await features.query;
    res.status(200).json({
      status: "success",
      data: {
        products: products,
        productsNumber: productsNumber,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.query.id);
    res.status(200).json({
      status: "success",
      data: {
        product: product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createNewProduct;
