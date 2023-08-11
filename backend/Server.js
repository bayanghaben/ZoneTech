require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./App");
const DB = process.env.DATABASE;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(DB, connectionParams).then(console.log("DataBase Connected"));

const port = process.env.PORT;

app.listen(port, (req, res) => {
  console.log(`Server is running on ${port}`);
});
