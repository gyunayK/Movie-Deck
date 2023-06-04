const router = require("express").Router();

const { getMovieByName } = require('../controller/movie.controller');


router.get('/search/:name', getMovieByName);


// router.get('/:id', async (req, res) => {
//     const db = await mongoConnect();
//     const movie = await db.collection('movies').findOne({ _id: ObjectId(req.params.id) });
//     if (!movie) return res.status(404).send('Movie not found');
//     res.send(movie);
// });


// router.post('/', async (req, res) => {
//     const { error } = validate(req.body, movieSchema);
//     if (error) return res.status(400).send(error.details[0].message);
//     const db = await mongoConnect();
//     const movie = await db.collection('movies').insertOne(req.body);
//     res.send(movie);
// });


module.exports = router;