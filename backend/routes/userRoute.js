const express = require("express");

const { signup, login } = require("../controllers/authController");
const {
  getUserById,
  addItemToBag,
  changeItemQuantity,
  deleteItemFromCart,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.route("/").get(getUserById);
router.route("/additem").post(addItemToBag);
router.route("/editquantity").post(changeItemQuantity);
router.route("/deletefromcard").post(deleteItemFromCart);

module.exports = router;
