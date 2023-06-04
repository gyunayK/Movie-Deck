const axios = require('axios');

exports.getMovieByName = async (req, res) => {
    const name = req.params.name;
    const apikey = process.env.MOVIE_API_KEY;
    const url = `https://www.omdbapi.com/?t=${name}&plot=full&apikey=${apikey}`;

    const response = await axios.get(url);
    const movie = response.data;
    res.send(movie);
}
