
const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URL;
const mongoDBName = process.env.MONGO_NAME;
console.log(mongoURL, mongoDBName);

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));


exports.getUser = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })

    if (user) {
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            password: user.password,
        }, process.env.JWT_SECRET)

        res.json({ status: 'success', user: token, firstName: user.firstName });
    } else {
        res.json({ status: 'error', user: false });
    }
}

exports.postUser = async (req, res) => {
    console.log(req.body);

    const email = req.body.email;

    try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            // If a user with the same email exists, return an error response
            return res.json({ status: 'error', error: 'User with this email already exists' });
        }

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: email,
            password: req.body.password,
        });

        await newUser.save();  // Save to database

        res.json({ status: 'success', message: 'User created successfully' });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
}

exports.postLogout = (req, res) => {
    res.json({ status: 'success', message: 'User logged out successfully' });
}

exports.postFavorite = async (req, res) => {
    const token = req.body.token;
    const movie = req.body.movie;

    try {
        // Verify the token and get the user
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the movie is already in favorites
        if (user.favorites && user.favorites.some(favMovie => favMovie.imdbID === movie.imdbID)) {
            return res.status(400).json({ message: 'Movie is already in favorites' });
        }

        // Add movie to user's favorites
        user.favorites = [...user.favorites, movie];
        await user.save();

        return res.status(200).json({ message: 'Movie added to favorites' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}



exports.deleteFavorite = async (req, res) => {
    const token = req.body.token;
    const movie = req.body.movie;

    try {
        // Verify the token and get the user
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the movie is already in favorites
        const movieInFavorites = user.favorites.find(fav => fav.imdbID === movie.imdbID);
        if (!movieInFavorites) {
            return res.status(400).json({ message: 'Movie is not in favorites' });
        }

        // Remove movie from user's favorites
        user.favorites = user.favorites.filter(fav => fav.imdbID !== movie.imdbID);
        await user.save();

        return res.status(200).json({ message: 'Movie removed from favorites' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};


exports.getFavorite = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const movieId = req.params.id;

    try {
        // Verify the token and get the user
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the movie is already in favorites
        if (user.favorites && user.favorites.some(favMovie => favMovie.imdbID === movieId)) {
            return res.status(200).json({ message: 'Movie is already in favorites' });
        }

        // If the movie is not in favorites, respond accordingly
        return res.status(404).json({ message: 'Movie is not in favorites' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};


exports.getFavoriteList = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        res.status(200).json({ message: 'Favorites list', favorites: user.favorites });


    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
        
    }

    
}
