
import React, {useEffect, useState} from "react";
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Router } from 'react-router-dom';

import './App.css';

function App() {

  const [allMeals, setAllMeals] = useState([]);
  const [counter, setCounter] = useState(0); 

  useEffect(()=> {    
        
    const fetchRecipes = async ()=>{

        try {
            const mealsWithMeat = await fetchMealsByIngredient('beef',0, 3);
            const mealsWithChicken = await fetchMealsByIngredient('chicken',0, 3);
            const mealsWithFish = await fetchMealsByIngredient('seafood',0, 3);

            setAllMeals([...mealsWithMeat, ...mealsWithChicken, ...mealsWithFish]);

        } catch (error) {
            console.error('Error fetching meals:', error);
        }
    };

    fetchRecipes();
  }, [])

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
          <li><a href="#home">Beef<br></br>🥩</a></li>
          <li><a href="#reviews">Chicken<br></br>🐔</a></li>
          <li><a href="#questions">Fish<br></br>🐟</a></li>
          <li><a href="#">Favorited<br></br>❤️</a></li>
        </ul>
      </div>
    </nav>

    <Routes>
      <Route path="/" element={<RecipeList allMeals={allMeals} setAllMeals={setAllMeals} counter={counter} setCounter={setCounter}/>} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
    </Routes>
    </div>
  );
}

export default App;
