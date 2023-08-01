const express = require('express');
const Model = require('./models/favouritemodel');
const router = express.Router();
const controllers = require('./controllers/favoritecontroller');

router.post('/favorites', controllers.addFav);
router.get('/favorites', controllers.getFavs);
router.delete('/favorites/:idMeal', controllers.deleteFav)

module.exports = router;
