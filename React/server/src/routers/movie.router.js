const router = require("express").Router();

const { getMovieByName } = require('../controller/movie.controller');


router.get('/search/:name', getMovieByName);

// router.use('/user').get('/user', getUser).post('user', postUser);



module.exports = router;