require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const cors = require('cors')

const movieRouter = require('./src/routers/movie.router')
const userRouter = require('./src/routers/user.router')

const app = express();

app.use(morgan('dev'))
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/movie', movieRouter)

app.use('/user', userRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});