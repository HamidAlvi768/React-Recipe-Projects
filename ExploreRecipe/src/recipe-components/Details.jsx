import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContextData } from "./useContextData";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Home, Menu } from "lucide-react";
import "./styles.css";

export const Details = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const { handleFavourite, favourite } = useContextData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        const data = await response.json();
        if (data?.data?.recipe) {
          setRecipe(data.data.recipe);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <div className="recipe-details">
      <section className="banner recipebanner">
        <div className="wrapper">
          <h1>Recipe Details</h1>
          <div className="row">
            <div className="col-45">
              <div className="img">
                <div className="tag">
                  {recipe.vegetarian ? "VEG" : "NON-VEG"}
                </div>
                <img
                  src={recipe.image_url || "/api/placeholder/400/300"}
                  alt={recipe.title}
                />
              </div>
            </div>
            <div className="col-5 fr">
              <h3>{recipe.title}</h3>
              <p>{recipe.description || "No description available."}</p>
            </div>
          </div>
        </div>
        <div className="leaf"></div>
        <div className="leaf04"></div>
        <div className="leaf07"></div>
      </section>

      <section className="recipedetails pattern02">
        <div className="wrapper">
          <div className="row">
            <div className="checklist col">
              <div className="title02">Ingredients Checklist</div>
              <ol>
                {recipe.ingredients &&
                  recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.quantity} {ingredient.unit}{" "}
                      {toTitleCase(ingredient.description)}
                    </li>
                  ))}
              </ol>
            </div>
          </div>
          
        </div>

        <span
                     className="d-add-favourite"
                     onClick={() => handleFavourite(recipe)}
                   >
                     {favourite && favourite.findIndex(fav => fav.id === recipe.id) !== -1
                       ? <FaHeart />
                       : <FaRegHeart />}
                     {favourite && favourite.findIndex(fav => fav.id === recipe.id) !== -1
                       ? " Remove Favourite"
                       : " Add to Favourites"}
                   </span>

        <div className="leaf02"></div>
        <div className="leaf03"></div>
        <div className="leaf05"></div>
        <div className="leaf06"></div>
      </section>
    </div>
  );
};
