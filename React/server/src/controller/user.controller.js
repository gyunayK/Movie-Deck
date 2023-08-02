
const User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const connectToDB = require('../service/mongodb');
connectToDB();


exports.getUser = async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If all checks pass, create and return a JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.json({ status: 'success', user: token, firstName: JSON.stringify({ firstName: user.firstName, lastName: user.lastName }) });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.postUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

        return res.status(201).json({ token });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}


exports.postLogout = (req, res) => {
    res.json({ status: 'success', message: 'User logged out successfully' });
}

exports.postFavorite = async (req, res) => {
    const token = req.body.token;
    const movie = req.body.movie;

    console.log(movie);

    try {
        // Verify the token and get the user
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the movie is already in favorites
        if (user.favorites && user.favorites.some(favMovie => favMovie.id === movie.id)) {
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
        const movieInFavorites = user.favorites.find(fav => fav.id === movie.id);
        if (!movieInFavorites) {
            return res.status(400).json({ message: 'Movie is not in favorites' });
        }

        // Remove movie from user's favorites
        user.favorites = user.favorites.filter(fav => fav.id !== movie.id);
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
        const favMovie = user.favorites && user.favorites.find(favMovie => String(favMovie.id) === movieId);
        if (favMovie) {
            
            return res.status(200).json({ message: 'Movie is already in favorites' });
        }

        // If the movie is not in favorites, respond accordingly
        return res.json({ message: 'Movie is not in favorites' });

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
