const express = require("express");
const cors = require("cors");
const app = express();

// const productRouter = require("./routes/productsRoute");
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoutes");

app.use(cors({ origin: "*" }));
app.use(express.json());

// app.use("/api/v1/products", productRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

module.exports = app;
