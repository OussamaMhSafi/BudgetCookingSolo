
import React, {useEffect, useState} from "react";
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import FavoriteList from "./components/Favoritelist";
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Router, Link } from 'react-router-dom';

import './App.css';

function App() {

  const [meatRecipes, setMeatRecipes] = useState([]);
  const [chickenRecipes, setChickenRecipes] = useState([])
  const [fishRecipes, setFishRecipes] = useState([])
  const [allMeals, setAllMeals] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(()=> {    
        
    const fetchRecipes = async ()=>{

      setIsLoading(true);

        try {
            const mealsWithMeat = await fetchMealsByIngredient('beef', 0, 24);
            const mealsWithChicken = await fetchMealsByIngredient('chicken', 0, 24);
            const mealsWithFish = await fetchMealsByIngredient('seafood', 0, 24);


            setMeatRecipes(mealsWithMeat);
            setChickenRecipes(mealsWithChicken);
            setFishRecipes(mealsWithFish);

            const firstThreeMeatRecipes = mealsWithMeat.slice(0, 3);
            const firstThreeChickenRecipes = mealsWithChicken.slice(0, 3);
            const firstThreeFishRecipes = mealsWithFish.slice(0, 3);

            const meals = ([...firstThreeMeatRecipes, ...firstThreeChickenRecipes, ...firstThreeFishRecipes])
            setAllMeals(meals);

            const response = await fetch("http://localhost:5000/favorites");
            const data = await response.json();
    
            const favoriteIds = data.map((favorite) => favorite.idMeal);
            const favoriteMeals = meals.filter((meal) => favoriteIds.includes(meal.idMeal));
            console.log(favoriteMeals);
            setFavorites(favoriteMeals);

        } catch (error) {
            console.error('Error fetching meals:', error);
        }

        setIsLoading(false);
    };

    fetchRecipes();
  }, [])

  const fetchMealsByIngredient = async (ingredient, count, inc) =>{

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${ingredient}`
    );
    const responseData = await response.json();
    //console.log(responseData.meals.length)
    const individualMeals = [];
  
    for (let i = count; i < inc; i++) {  
      const mealResponse = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${responseData.meals[i].idMeal}`
      );
      const data = await mealResponse.json();
      const individualMeal = data.meals[0];

      const ingredient12 = individualMeal.strIngredient12;
      if (ingredient12===null || ingredient12.trim() === "") {
        individualMeals.push(individualMeal);
      }    }

    return individualMeals;
  }

  return (
    <div className="App">

    <nav>
      <div className="container grid-12-col">
        <div className="nav-inner-wrapper">
          <Link to="/" className="nav-logo">            
            <span>Simpleton Recipes Inc.</span>&nbsp;
          </Link>
        </div>

        <ul className="nav-menu">

          <li><Link to="/favorites">Favorited<br></br>❤️</Link></li>
        </ul>
      </div>
    </nav>
    <div className={`${isLoading ?"loading" : ""}`}>
    </div>
    <Routes>
      <Route path="/" element={<RecipeList meatRecipes={meatRecipes} chickenRecipes={chickenRecipes} 
      fishRecipes={fishRecipes} allMeals={allMeals} setAllMeals={setAllMeals} favorites={favorites} setFavorites={setFavorites}/>} />
      <Route path="/recipe/:id" element={<RecipeDetails favorites={favorites} setFavorites={setFavorites}/>}/>
      <Route path="/favorites" element={<FavoriteList allMeals={allMeals} favorites={favorites} setFavorites={setFavorites} />} />
    </Routes>
    </div>
  );
}


export default App;
