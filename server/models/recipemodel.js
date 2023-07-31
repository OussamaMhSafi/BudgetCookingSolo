const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    idMeal: { type: String, required: true },
    favorite: {type:Boolean, required:true}
});

module.exports = mongoose.model('Data', recipeSchema);