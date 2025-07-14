const Post = require("../models/Post");

exports.getPosts = async (req, res) => {
  try {
    const postlar = await Post.find();
    return res.json(postlar);
  } catch (error) {
    console.log("error ama postları getirirken", error);
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    return res.status(200).json(post);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Post bulunamadı ya da network hatası" });
  }
};
