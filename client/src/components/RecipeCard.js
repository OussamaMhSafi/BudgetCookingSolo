import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken} from '@fortawesome/free-solid-svg-icons'
import {faHeart as faHeartOutline} from '@fortawesome/free-regular-svg-icons'

const RecipeCard = ({meal, onImgClick, onLike, category, tags})=>{

    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
        onLike(meal, !liked);
    };

    useEffect(()=>{})

    return (
        <div className="recipe-card" >
            <div className={`recipe-card-color-bar-${category}`}>
                <span className="category-text">{category}</span>
            </div>
            <div className="recip-card-content" >
                <img className="recipe-img" src={meal.strMealThumb} alt={meal.strMeal} onClick={onImgClick}/>
                <h3>{meal.strMeal}</h3>
                <span className="heart" onClick={handleLikeClick}>
                    {liked ? (
                        <FontAwesomeIcon icon={faHeart} aria-hidden="true"/>
                    ) : (
                        <FontAwesomeIcon icon={faHeartOutline} aria-hidden="true"/>
                    )}
                </span>
            </div>

            <div className="tags-container">
                {tags &&
                    tags.split(",").map((tag, index) => (
                        <div key={index} className="tag">
                            {tag.trim()}
                        </div>
                ))}
                {meal.strArea}
            </div>
        </div>
      );
}

export default RecipeCard;
