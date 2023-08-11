const express = require("express");

const {
  aliasSixProducts,
  getSixProducts,
  getAllCategories,
  getAllProducts,
  getOneProduct,
} = require("../controllers/productControllers");

const router = express.Router();

router.route("/random-four-products").get(aliasSixProducts, getSixProducts);
router.route("/allCategories").get(getAllCategories);
router.route("/allproducts").get(getAllProducts);
router.route("/oneproduct").get(getOneProduct);

module.exports = router;
