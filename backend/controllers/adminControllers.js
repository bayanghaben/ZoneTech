const Product = require("../models/ProductModel");

exports.createNewProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json({
      status: "success",
      message: "Product created successfully",
      data: {
        newProduct: newProduct,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err,
    });
  } 
};
