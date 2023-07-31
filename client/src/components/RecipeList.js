import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import RecipeCard from "./RecipeCard";
import RecipeDetails from "./RecipeDetails";
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRefresh, faSpinner } from "@fortawesome/free-solid-svg-icons";


function RecipeList({ meatRecipes, chickenRecipes, fishRecipes, allMeals, setAllMeals}){

    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [counter, setCounter] = useState(3); 


    useEffect(()=> {

    }, [])

    const navigate = useNavigate();

    const handleCardClick = (mealId) => {

        const selectedMeal = allMeals.find((meal) => meal.idMeal === mealId);
        navigate(`/recipe/${mealId}`, { state: { meal: selectedMeal } });
    };

    const handleRefresh = async () => {

        var c = counter +3;
        console.log(c);
        setIsLoading(true);

        await delay(2000);
    
        const nextThreeMeatRecipes = meatRecipes.slice(counter, c);
        const nextThreeChickenRecipes = chickenRecipes.slice(counter, c);
        const nextThreeFishRecipes = fishRecipes.slice(counter, c);

        setAllMeals([...nextThreeMeatRecipes, ...nextThreeChickenRecipes, ...nextThreeFishRecipes]);

        setCounter(c);
        setIsLoading(false);

    };

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleLike = (meal, isLiked) => {
        if (isLiked) {
          setFavorites([...favorites, meal]);
        } else {
          setFavorites(favorites.filter((favorite) => favorite.idMeal !== meal.idMeal));
        }
        console.log(favorites);
    };


    return (
        <div className="recipe-card-list">

            <div className={`recipe-card-container${isLoading ? "-loading" : ""}`}>
                {allMeals.map((meal) => (
                <RecipeCard
                    key={meal.idMeal}
                    meal={meal}
                    category={meal.strCategory.toLowerCase()} // Assuming strCategory is in lowercase
                    tags={meal.strTags}
                    onImgClick={() => handleCardClick(meal.idMeal)}
                    onLike={handleLike}
                />
                ))}
            </div>
        
            <button className="refresh-btn" onClick={handleRefresh}>Refresh   <FontAwesomeIcon icon={faSpinner} className={isLoading ? "spinner" : ""} aria-hidden="true"/></button>
        </div>
    );
}

export default RecipeList;