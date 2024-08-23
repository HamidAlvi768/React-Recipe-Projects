import { useState, useEffect } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useContextData } from "./useContextData";

export const Favourite = () => {
  const { favourite, setFavourites } = useContextData();

  let containerClassName;
  if (favourite.length === 1) {
    containerClassName = "favourite-recipe";
  } else if (favourite.length === 2) {
    containerClassName = "twofavourite-recipes";
  }

  else{
    containerClassName = "favourite-recipes";
  }
  return (
    <div className={containerClassName}>
      <div className={`${containerClassName}__container`}>
        {favourite.map((favourite, index) => (
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/details/${favourite.id}`}
            key={index}
            className={`${containerClassName}__item`}
          >
            <h3 className={`${containerClassName}__title`}>{favourite.title}</h3>
            <img
              className={`${containerClassName}__image`}
              src={favourite.image_url}
              alt={favourite.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
