const express = require('express');
const Model = require('./models/recipemodel');
const router = express.Router();
const controllers = require('./controllers/recipecontroller');

// POST new recipes
router.post('/favorites', controllers.addRecipe);

// GET recipes
router.get('/favorites', controllers.getRecipes);

module.exports = router;
