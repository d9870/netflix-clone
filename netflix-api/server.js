const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/netflix", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log(err);
});

app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
