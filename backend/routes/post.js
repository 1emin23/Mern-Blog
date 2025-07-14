const express = require("express");
const router = express.Router();
const post = require("../controllers/postController");

router.get("/getAllPost", post.getPosts);
router.get("/:id", post.getPostById);

module.exports = router;
