const express = require("express");

const { createNewProduct } = require("../controllers/adminControllers");

const router = express.Router();

router.route("/").post(createNewProduct);

module.exports = router;
