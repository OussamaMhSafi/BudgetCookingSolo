import React, {useEffect, useState} from "react";
import RecipeCard from "./RecipeCard";

function RecipeList(){

    const [allMeals, setAllMeals] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [counter, setCounter] = useState(0); 

    useEffect(()=> {    
        
        const fetchRecipes = async ()=>{

            try {
                const mealsWithMeat = await fetchMealsByIngredient('beef', counter);
                const mealsWithChicken = await fetchMealsByIngredient('chicken', counter);
                const mealsWithFish = await fetchMealsByIngredient('seafood', counter);

                setAllMeals([...mealsWithMeat, ...mealsWithChicken, ...mealsWithFish]);
                //setAllMeals(mealsWithChicken);

            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };
    
        fetchRecipes();
    }, [])

    const handleCardClick = (mealId) => {

    };

    const fetchMealsByIngredient = async (ingredient, start) =>{
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${ingredient}`
        );
        const data = await response.json();
        return data.meals.slice(start, start + 3);
    }

    function displayMeals(meals, title) {
        console.log(`--- ${title} ---`);
        meals.forEach((meal) => console.log(meal.strMeal));
    }

    const handleRefresh = async () => {

        var c = counter +3;
        try {
            const nextMeatData = await fetchMealsByIngredient("beef", c);
            const nextChickenData = await fetchMealsByIngredient("chicken", c);
            const nextFishData = await fetchMealsByIngredient("seafood", c);

            setAllMeals([...nextMeatData, ...nextChickenData, ...nextFishData]);
        } catch (error) {
            console.error("Error fetching meals:", error);
        }
        setCounter(counter+3);
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
            {allMeals.map((meal) => (
                <RecipeCard 
                key={meal.idMeal} 
                meal={meal} 
                onClick={() => handleCardClick(meal.idMeal)}
                onLike={handleLike}/>
            ))}
          <button onClick={handleRefresh}>Refresh</button>
        </div>
    );
}

export default RecipeList;