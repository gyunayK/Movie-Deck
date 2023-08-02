const router = require("express").Router();
const { getCommentByMovieId, postComment } = require("../controller/comment.controller");

router.get("/:movieId", getCommentByMovieId).post('/post', postComment)

module.exports = router;
