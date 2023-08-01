import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import RecipeCard from "./RecipeCard";
import RecipeDetails from "./RecipeDetails";
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRefresh, faSpinner } from "@fortawesome/free-solid-svg-icons";


function FavoriteList({ allMeals, favorites, setFavorites}){

    useEffect(()=> {}, [])

    const navigate = useNavigate();

    const handleCardClick = (mealId) => {

        const selectedMeal = allMeals.find((meal) => meal.idMeal === mealId);
        navigate(`/recipe/${mealId}`, { state: { meal: selectedMeal } });
    };

    const handleLike = async (meal, isLiked) => {
      if (isLiked) {
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

        console.log();

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
        }
        catch (error) {
          console.error("Error:", error);
        }
        console.log(favorites);
      }
    };

    if (favorites.length === 0) {
      return(
      <div className="no-favorites">
        <h2>Nothing here, go back and start liking!</h2>
      </div>);
    }

    return (
        <div className="recipe-card-list">
            <div className={`recipe-card-container`}>
                {favorites.map((meal) => (
                <RecipeCard
                    key={meal.idMeal}
                    meal={meal}
                    category={meal.strCategory.toLowerCase()} // Assuming strCategory is in lowercase
                    tags={meal.strTags}
                    onImgClick={() => handleCardClick(meal.idMeal)}
                    onLike={handleLike}
                    liked={favorites.some((favorite) => favorite.idMeal === meal.idMeal)}
                />
                ))}
            </div>
        </div>
    );
}

export default FavoriteList;