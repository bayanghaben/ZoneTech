const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// const currentCartSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Product",
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
// });

// const CurrentCart = mongoose.model("PastOrders", currentCartSchema);

const notificationSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      //This only works on CREATE and SAVE !!!
      validator: function (ele) {
        return ele === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  isVendor: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
  pastOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  currentCart: [
    {
      type: Object,
    },
  ],
  notification: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
});

userSchema.pre("save", async function (next) {
  // Only run this function if password is actually modified
  if (!this.isModified("password")) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
