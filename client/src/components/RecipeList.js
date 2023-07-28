import React, {useEffect, useState} from "react";
import RecipeCard from "./RecipeCard";

function RecipeList(){

    const [allMeals, setAllMeals] = useState([]);
    const [mealsWithMeat, setMealsWithMeat] = useState([]);
    const [mealsWithChicken, setMealsWithChicken] = useState([]);
    const [mealsWithFish, setMealsWithFish] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [transformedCardId, setTransformedCardId] = useState(null);

    useEffect(()=> {    
        
        const fetchRecipes = async ()=>{

            try {
                // Find three meals with meat
                const mealsWithMeat = await fetchMealsByIngredient('beef');
            
                // Find three meals with chicken
                const mealsWithChicken = await fetchMealsByIngredient('chicken');
            
                // Find three meals with fish
                const mealsWithFish = await fetchMealsByIngredient('seafood');

                //setAllMeals([...mealsWithMeat, ...mealsWithChicken, ...mealsWithFish]);
                setAllMeals(mealsWithChicken);

            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };
    
        fetchRecipes();
    }, [])

    const handleCardClick = (mealId) => {
        if (transformedCardId === mealId) {
          // If the clicked card is already transformed, remove the transformation
          setTransformedCardId(null);
        } else {
          // Otherwise, apply the transformation to the clicked card
          setTransformedCardId(mealId);
        }
    };

    const fetchMealsByIngredient = async (ingredient) =>{
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${ingredient}`
        );
        const data = await response.json();
        return data.meals.slice(0, 3);
    }

    function displayMeals(meals, title) {
        console.log(`--- ${title} ---`);
        meals.forEach((meal) => console.log(meal.strMeal));
    }

    const handleRefresh = async () => {
        try {
            const nextMeatData = await fetchMealsByIngredient("beef");
            const nextChickenData = await fetchMealsByIngredient("chicken");
            const nextFishData = await fetchMealsByIngredient("seafood");

            setAllMeals([...nextMeatData, ...nextChickenData, ...nextFishData]);
        } catch (error) {
            console.error("Error fetching meals:", error);
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