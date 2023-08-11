const User = require("../models/UserModel");
const Product = require("../models/ProductModel");

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.query.id);
    res.status(200).json({
      status: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: "Couldnt find user",
    });
  }
};

exports.addItemToBag = async (req, res) => {
  try {
    const userToAddItemTo = await User.findById(req.query.id);
    const prodcutToAdd = req.body.product;
    const quantity = req.body.quantity;
    for (let i = 0; i < userToAddItemTo.currentCart.length; i++) {
      if (userToAddItemTo.currentCart[i].product == prodcutToAdd) {
        userToAddItemTo.currentCart[i].quantity =
          Number(userToAddItemTo.currentCart[i].quantity) + Number(quantity);
        await User.findByIdAndUpdate(
          req.query.id,
          { currentCart: userToAddItemTo.currentCart },
          { new: true }
        );
        return res.status(200).json({
          message: "success",
          data: {
            userToAddItemTo: userToAddItemTo,
          },
        });
      }
    }
    const product = await Product.findById(prodcutToAdd);
    userToAddItemTo.currentCart.push({
      product: prodcutToAdd,
      quantity: quantity,
      price: product.price,
    });
    await userToAddItemTo.save();
    return res.status(200).json({
      message: "success",
      data: {
        userToAddItemTo: userToAddItemTo,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.changeItemQuantity = async (req, res) => {
  try {
    const user = await User.findById(req.query.id);
    const productIndex = user.currentCart.findIndex(
      (ele) => ele.product === req.body.product
    );
    user.currentCart[productIndex] = {
      ...user.currentCart[productIndex],
      quantity: req.body.quantity,
    };
    await user.save();
    res.status(200).json({
      message: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteItemFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.query.id);
    const productIndex = user.currentCart.findIndex(
      (ele) => ele.product === req.body.product
    );
    user.currentCart.splice(productIndex, 1);
    await user.save();
    res.status(200).json({
      message: "success",
      data: {
        user: user,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
