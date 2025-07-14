const mongoose = require("mongoose");
const Post = require("./models/Post.js");
require("dotenv").config();

const getAllPost = async () => {
  return await Post.find();
};

dummyData = {
  title: "Sirus Yazılım",
  content: "Test amaclı yazımız. Sirus yazılımın yeri bende ayrıdır",
};

const insertDocument = async (data) => {
  try {
    await Post.create(data);
    console.log("hatasız bir sekilde islem gerceklesti");
  } catch (error) {
    console.log("database'e insert ederkej bir hata ile karsılastık", error);
  }
};

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("database baglantısı basarılı bir sekilde gerceklesti");
    const postlarımız = await getAllPost();
    console.log("first", postlarımız);
    // await insertDocument(dummyData);
  })
  .catch((err) => {
    console.log("database baglantısı basarısız:", err);
  });
