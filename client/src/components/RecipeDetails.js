import React from "react";
import { useLocation } from 'react-router-dom';

function RecipeDetails() {
    const location = useLocation();
    const meal = location.state.meal;

    return (
        <div className="detail-container">
            <h1>{meal.strMeal}</h1>
            <div className="detail-content">
                <img className="detail-img" src={meal.strMealThumb} alt={meal.strMeal} />
                
                <div className="recipe-details">
                    <p>Ingredients: {meal.strIngredient1}, {meal.strIngredient2}, {meal.strIngredient3}, {meal.strIngredient4}, {meal.strIngredient5}, {meal.strIngredient6}, {meal.strIngredient7}
                    , {meal.strIngredient8}, {meal.strIngredient9}, {meal.strIngredient10}, {meal.strIngredient11}</p>

                    <p>{meal.strInstructions}</p>

                </div>
                
            </div>
        </div>
    );
}

export default RecipeDetails;