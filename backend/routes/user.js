const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.post("/like/:postId", async (req, res) => {
  const { user_id } = req.body;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post bulunamadı" });

    // Eğer zaten like atmışsa tekrar ekleme
    if (post.likes.includes(user_id)) {
      return res.status(400).json({ message: "Zaten beğenmişsin" });
    }

    post.likes.push(user_id);
    await post.save();

    return res
      .status(200)
      .json({ message: "Post beğenildi", likes: post.likes });
  } catch (error) {
    console.error("Like işlemi hatası:", error);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.delete("/delete/:postId", async (req, res) => {
  const { postId } = req.params;
  const { user_id } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: user_id } },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Beğeni kaldırıldı", likes: post.likes });
  } catch (error) {
    console.error("Unlike işlem hatası:", error);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Yorum yapılan postlar
    const commentedPosts = await Post.find({ "comments.user": userId });

    // Beğenilen postlar
    const likedPosts = await Post.find({ likes: userId });

    res.status(200).json({
      likedPosts,
      commentedPosts,
    });
  } catch (err) {
    console.error("Profil verisi alınamadı", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

module.exports = router;
