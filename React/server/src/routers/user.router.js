const router = require("express").Router();
const { getUser, postUser } = require('../controller/user.controller');



router.post('/login', getUser);
router.post('/register', postUser);

module.exports = router;
