const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    idMeal: { type: String, required: true },
    strMeal: { type: String, required: true },
    strCategory: { type: String, required: true },
    strArea: { type: String},
    strInstructions: { type: String, required: true },
    strMealThumb: { type: String, required: true },
    strTags: { type: String},
    strYoutube: { type: String},
    strIngredient1: { type: String, required: true },
    strIngredient2: { type: String, required: true },
    strIngredient3: { type: String, required: true },
    strIngredient4: { type: String, required: true },
    strIngredient5: { type: String, required: true },
    strIngredient6: { type: String, required: true },
    strIngredient7: { type: String, required: true },
    strIngredient8: { type: String, required: true },
    strIngredient9: { type: String, required: true },
    strIngredient10: { type: String, required: true },
    strMeasure1: { type: String, required: true },
    strMeasure2: { type: String, required: true },
    strMeasure3: { type: String, required: true },
    strMeasure4: { type: String, required: true },
    strMeasure5: { type: String, required: true },
    strMeasure6: { type: String, required: true },
    strMeasure7: { type: String, required: true },
    strMeasure8: { type: String, required: true },
    strMeasure9: { type: String, required: true },
    strMeasure10: { type: String, required: true },
    favorite: {type:Boolean, required:true}
});

module.exports = mongoose.model('Data', recipeSchema);