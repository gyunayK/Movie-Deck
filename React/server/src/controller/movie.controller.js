const axios = require('axios');

exports.getMovieByName = async (req, res) => {
    const name = req.params.name;
    if (!name) {
        return;
    }
    const apikey = process.env.MOVIE_API_KEY;
    const url = `https://www.omdbapi.com/?t=${name}&plot=full&apikey=${apikey}`;

    try {
        const response = await axios.get(url);
        const movie = response.data;
        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch movie' });
    }
}
