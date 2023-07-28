import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart, faHeartBroken} from '@fortawesome/free-solid-svg-icons'
import {faHeart as faHeartOutline} from '@fortawesome/free-regular-svg-icons'

const RecipeCard = ({meal, onClick, onLike})=>{

    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
        onLike(meal, !liked);
    };

    useEffect(()=>{

    })

    return (
        <div className="recipe-card" onClick={onClick}>
            <div className="recip-card-content" >
                <img className="recipe-img" src={meal.strMealThumb} alt={meal.strMeal} />
                <h3>{meal.strMeal}</h3>
                <span className="heart" onClick={handleLikeClick}>
                    {liked ? (
                        <FontAwesomeIcon icon={faHeart} aria-hidden="true"/>
                    ) : (
                        <FontAwesomeIcon icon={faHeartOutline} aria-hidden="true"/>
                    )}
                </span>
            </div>
        </div>
      );
}

export default RecipeCard;
