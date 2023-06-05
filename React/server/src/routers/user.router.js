const router = require("express").Router();
const { getUser, postUser, postLogout } = require('../controller/user.controller');



router.post('/login', getUser);
router.post('/register', postUser);
router.post('/logout', postLogout)

module.exports = router;
