import React from "react";
import { FaSearch } from "react-icons/fa";
import { useContextData } from "./useContextData";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const { search, setSearch, setData, data } = useContextData();
  const navigate = useNavigate();

  const fetchRecipes = async (e) => {
    e.preventDefault();
    let response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}`
    );
    response = await response.json();
    setData(response?.data?.recipes);
    navigate("/recipes");
  };

  return (
    <div className="search-container">
      <img
        src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
        alt=""
        style={{ maxHeight: "95%", maxWidth: "95%", margin: "auto" }}
      />
      <form className="search-bar" onSubmit={fetchRecipes}>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes..."
          required
        />{" "}
        <button className="search-btn" type="submit">
          <FaSearch id="search-icon" />
        </button>
      </form>
    </div>
  );
};
