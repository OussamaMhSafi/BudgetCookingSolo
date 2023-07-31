
import React, {useEffect, useState} from "react";
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Router } from 'react-router-dom';

import './App.css';

function App() {

  const [meatRecipes, setMeatRecipes] = useState([]);
  const [chickenRecipes, setChickenRecipes] = useState([])
  const [fishRecipes, setFishRecipes] = useState([])
  const [allMeals, setAllMeals] = useState([]);

  useEffect(()=> {    
        
    const fetchRecipes = async ()=>{

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

            setAllMeals([...firstThreeMeatRecipes, ...firstThreeChickenRecipes, ...firstThreeFishRecipes]);
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
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
          <a className="nav-logo" href="#">
            <span>Simpleton Recipes Inc.</span>&nbsp;
          </a>
          <div className="mobile-hamburger-wrapper">
            <div className="mobile-hamburger">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
        </div>

        <ul className="nav-menu">
          <li><a href="beef">Beef<br></br>🥩</a></li>
          <li><a href="chicken">Chicken<br></br>🐔</a></li>
          <li><a href="seafood">Fish<br></br>🐟</a></li>
          <li><a href="favroties">Favorited<br></br>❤️</a></li>
        </ul>
      </div>
    </nav>

    <Routes>
      <Route path="/" element={<RecipeList meatRecipes={meatRecipes} chickenRecipes={chickenRecipes} 
      fishRecipes={fishRecipes} allMeals={allMeals} setAllMeals={setAllMeals}/>} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
    </Routes>
    </div>
  );
}


export default App;
