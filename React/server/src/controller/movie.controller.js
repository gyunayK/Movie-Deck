const axios = require('axios');

exports.getMovieByName = async (req, res) => {
    const name = req.params.name;
    if (!name) {
        return;
    }
    const apikey = process.env.MOVIE_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=faa26c98f672c9b9ceea429f26f087b1`;

    try {
        const response = await axios.get(url);
        const movie = response.data;
        res.json(movie.results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch movie' });
    }
}



// https://www.omdbapi.com/?t=${name}&plot=full&apikey=${apikey}