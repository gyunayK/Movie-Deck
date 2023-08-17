const axios = require("axios");
const API_KEY = process.env.MVDB_API_KEY;

exports.getMovieByName = async (req, res) => {
  const name = req.params.name;
  if (!name) {
    return;
  }
  const url = `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const movie = response.data;
    res.json(movie.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movie" });
  }
};

// https://www.omdbapi.com/?t=${name}&plot=full&apikey=${apikey}
