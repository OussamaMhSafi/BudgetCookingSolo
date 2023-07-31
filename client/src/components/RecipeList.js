import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import RecipeCard from "./RecipeCard";
import RecipeDetails from "./RecipeDetails";
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRefresh, faSpinner } from "@fortawesome/free-solid-svg-icons";


function RecipeList({allMeals, setAllMeals, counter, setCounter}){

    const [meatRecipes, setMeatRecipes] = useState([]);
    const [chickenRecipes, setChickenRecipes] = useState([])
    const [fishRecipes, setFishRecipes] = useState([])
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(()=> {    
        
        
    }, [])

    const navigate = useNavigate();

    const handleCardClick = (mealId) => {

        const selectedMeal = allMeals.find((meal) => meal.idMeal === mealId);
        navigate(`/recipe/${mealId}`, { state: { meal: selectedMeal } });
    };

    const fetchMealsByIngredient = async (ingredient, start, count) =>{
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${ingredient}`
      );
      const responseData = await response.json();
    
      const individualMeals = [];
      let fetchedCount = 0;
    
      for (let i = start; i < start+count; i++) {
        if (fetchedCount === count) break;
    
        const mealResponse = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${responseData.meals[i].idMeal}`
        );
        const data = await mealResponse.json();
        const individualMeal = data.meals[0];
    
        const ingredient12 = individualMeal.strIngredient12;
        if (!ingredient12 || ingredient12.trim() === "") {
          console.log(individualMeal);
          individualMeals.push(individualMeal);
          fetchedCount++;
        }
      }
    
      if (fetchedCount < count && fetchedCount < count) {
        const remainingMeals = await fetchMealsByIngredient(ingredient, start + count, count - fetchedCount);
        individualMeals.push(...remainingMeals);
      }
    
      return individualMeals;
    }

    const handleRefresh = async () => {

        var c = counter +3;
        console.log(c);
        setCounter(counter+3);
        setIsLoading(true);

        try {
            const nextMeatData = await fetchMealsByIngredient("beef", c, 3);
            const nextChickenData = await fetchMealsByIngredient("chicken", c, 3);
            const nextFishData = await fetchMealsByIngredient("seafood", c, 3);

            setAllMeals([...nextMeatData, ...nextChickenData, ...nextFishData]);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching meals:", error);
            setIsLoading(false);
        }
    };

    const handleLike = (meal, isLiked) => {
        if (isLiked) {
          // Add the liked recipe to the favorites list
          setFavorites([...favorites, meal]);
        } else {
          // Remove the unliked recipe from the favorites list
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