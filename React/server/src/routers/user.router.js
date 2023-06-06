const router = require("express").Router();
const { getUser, postUser, postLogout, postFavorite, deleteFavorite, getFavorite } = require('../controller/user.controller');



router.post('/login', getUser);
router.post('/logout', postLogout)
router.post('/register', postUser);

router.post('/favorite', postFavorite)
.get('/favorite/:id', getFavorite)
.delete('/favorite', deleteFavorite);


module.exports = router;
