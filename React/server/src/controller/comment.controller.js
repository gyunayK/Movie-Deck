const Comment = require("../model/comment.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getCommentByMovieId = async (req, res) => {
  const movieId = req.params.movieId;
  try {
    const comments = await Comment.find({ movieId }).populate("userId", "name"); // Add .populate() method
    return res.status(200).json({ comments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.postComment = async (req, res) => {
  const { text, movieId, token } = req.body;

  try {
    // Verify the token and get the user
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    const newComment = new Comment({
      text,
      movieId,
      userId,
    });

    await newComment.save();

    return res.status(201).json({ message: "Comment posted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
