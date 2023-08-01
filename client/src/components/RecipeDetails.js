import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken} from '@fortawesome/free-solid-svg-icons'
import {faHeart as faHeartOutline} from '@fortawesome/free-regular-svg-icons'

function RecipeDetails({ favorites, setFavorites }) {
  const location = useLocation();
  const meal = location.state.meal;
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Check if the current meal is already in favorites to set the initial liked state
    const isLiked = favorites.some((favorite) => favorite.idMeal === meal.idMeal);
    setLiked(isLiked);
  }, [favorites, meal]);

  const renderIngredientsTable = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredientName = meal[`strIngredient${i}`];
      const ingredientQuantity = meal[`strMeasure${i}`];
      if (ingredientName && ingredientName.trim() !== "") {
        ingredients.push({ name: ingredientName, quantity: ingredientQuantity });
      }
    }

    return (
      <table className="ingredients-table">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, index) => (
            <tr key={index}>
              <td>{ingredient.name}</td>
              <td>{ingredient.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleLikeClick = async () => {
    setLiked(!liked);

    if (!liked) {
      try {
        const response = await fetch("http://localhost:5000/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idMeal: meal.idMeal }),
        });

        if (response.ok) {
          setFavorites([...favorites, meal]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        const response = await fetch(`http://localhost:5000/favorites/${meal.idMeal}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idMeal: meal.idMeal }),
        });

        if (response.ok) {
          setFavorites(favorites.filter((favorite) => favorite.idMeal !== meal.idMeal));
        } else {
          console.error("Failed to delete favorite:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="detail-container">
      <h1>{meal.strMeal}</h1>
      <div className="detail-content">
        <img className="detail-img" src={meal.strMealThumb} alt={meal.strMeal} />
        <span className="heart" onClick={handleLikeClick}>
            {liked ? (
                <FontAwesomeIcon icon={faHeart} aria-hidden="true"/>
            ) : (
                <FontAwesomeIcon icon={faHeartOutline} aria-hidden="true"/>
            )}
          </span>
        <div className="recipe-details">
          <h2>Ingredients:</h2>
          {renderIngredientsTable()}
          <h2>Instructions:</h2>
          <p className="recipe-instructions">{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;