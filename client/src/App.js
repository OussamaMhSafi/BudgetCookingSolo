import logo from './logo.svg';
import RecipeList from './components/RecipeList';
import './App.css';

function App() {
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

      <RecipeList></RecipeList>
    </div>
  );
}

export default App;
