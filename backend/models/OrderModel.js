const mongoose = require("mongoose");

const oneOrderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const OneOrder = mongoose.model("NewOrder", oneOrderSchema);

const orderSchema = new mongoose.Schema({
  orderedItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OneOrder",
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
