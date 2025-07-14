const Post = require("../models/Post");
const User = require("../models/User");

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

exports.insertComment = async (req, res) => {
  console.log("insert route'ina geldi mi log'u");
  const { postId } = req.params;
  const { comment, userId } = req.body;

  console.log("postId:", postId);
  console.log("comment:", comment);
  console.log("userId:", userId);

  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    if (!post) return res.status(404).json({ message: "Post bulunamadı" });
    const data = {
      user: user._id,
      username: user.username,
      content: comment,
    };
    post.comments.push(data);
    await post.save();
    return res
      .status(200)
      .json({ message: "Post yorum atıldı", comments: post.comments });
  } catch (error) {
    console.error("Like işlemi hatası:", error);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
};
