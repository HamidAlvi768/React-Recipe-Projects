import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContextData } from './useContextData';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Home, Menu } from 'lucide-react';
import './styles.css';

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

  return (
    <div className="bg-green-500 min-h-screen text-white">
      <header className="flex justify-between items-center p-4">
        <img src="/api/placeholder/100/50" alt="Dalda logo" className="h-12" />
        <div className="flex gap-4">
          <Home className="w-6 h-6" />
          <Menu className="w-6 h-6" />
        </div>
      </header>
      
      <main className="px-4 py-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <img
                src={recipe.image_url || "/api/placeholder/400/300"}
                alt={recipe.title || "Recipe Image"}
                className="w-full rounded-lg shadow-lg d-recipe-image"
              />
              <span className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                {recipe.vegetarian ? "VEG" : "NON-VEG"}
              </span>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold mb-4 d-recipe-title">{recipe.title}</h1>
            <p className="text-lg">
              {recipe.description || "No description available."}
            </p>
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
          </div>
        </div>
      </main>

      <div className="recipe-details-2">
        <div className="wrapper">
          <div className="row">
            <ul className="time">
              <li>
                <img
                  src={recipe.image_url || "/api/placeholder/400/300"}
                  alt={recipe.title || "Recipe Image"}
                />
              </li>
              {/* More details can be added here */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

