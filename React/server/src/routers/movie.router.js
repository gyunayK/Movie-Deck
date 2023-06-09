const router = require("express").Router();
const { getMovieByName } = require('../controller/movie.controller');

router.get('/search/:name', getMovieByName);

module.exports = router;