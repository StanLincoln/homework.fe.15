import React, { useEffect, useState } from "react";
import { fetchRecipe } from "../../utils/fetchRecipe";
import "./recipe.css";

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const [currentRecipeId, setCurrentRecipeId] = useState(1);

  useEffect(() => {
    fetchRecipe(currentRecipeId, setRecipe);
  }, [currentRecipeId]);

  const switchToNextRecipe = () => {
    setCurrentRecipeId((prevId) => prevId + 1);
  };

  const switchToPreviousRecipe = () => {
    if (currentRecipeId > 1) {
      setCurrentRecipeId((prevId) => prevId - 1);
    }
  };

  if (!recipe || !recipe.ingredients) {
    return <p>No recipe selected</p>;
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <img src={recipe.image} alt={recipe.name} />
          <div className="header__description">
              <h3>Ingredients</h3>
            <div className="ingredients">
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
                <h3>Directions</h3>
              <div className="directions">
                <p>{recipe.instructions}</p>
              </div>
          </div>
          <div className="recipe__title">
            <h1>{recipe.name}</h1>
          </div>
        </div>
              <div className="info">
                <ul>
                  <li>Preparation time: {recipe.prepTimeMinutes} min.</li>
                  <li>Cooking time: {recipe.cookTimeMinutes} min.</li>
                  <li>Servings: {recipe.servings}</li>
                  <li>Difficulty: {recipe.difficulty}</li>
                  <li>Cuisine: {recipe.cuisine}</li>
                </ul>
              </div>
        <div className="btn">
          <button className="back" onClick={switchToPreviousRecipe}>Previous Recipe</button>
          <button className="button" onClick={switchToNextRecipe}>Next Recipe</button>
        </div>
      </div>
    </>
  );
};

export default Recipe;
