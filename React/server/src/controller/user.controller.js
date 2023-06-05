
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
            return res.status(420).json({ status: 'error', error: 'User with this email already exists' });
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

