const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/" + process.env.DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect MongoDB", error);
  });
