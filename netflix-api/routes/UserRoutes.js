const { addToLikedMovies, getLikedMovies, deleteLikedMovie } = require('../controller/UserController');

const router = require('express').Router();

router.post('/add', addToLikedMovies); 
router.get("/liked/:email", getLikedMovies )
router.put("/delete", deleteLikedMovie)

module.exports = router;