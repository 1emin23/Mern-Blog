const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Post = require("./models/Post");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// 📁 Rotalar
app.use("/api", require("./routes/auth"));
app.use("/post", require("./routes/post"));
app.use("/user", require("./routes/user"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
