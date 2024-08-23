import { createContext, useState } from "react";

export const context = createContext();

//context provider

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [favourite, setFavourite] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);


  const handleFavourite = (currentItem) => {
   let cpyFavourite = [...favourite];
   let index = cpyFavourite.findIndex((item) => item.id === currentItem.id);

   if (index === -1) {
      cpyFavourite.push(currentItem);
    } else {
      cpyFavourite.splice(index);
    }

    setFavourite(cpyFavourite);

    // const newFavourites = [...favourite, currentItem];
    // setFavourite(newFavourites);
  };

  return (
    <context.Provider
      value={{
        data,
        setData,
        favourite,
        setFavourite,
        search,
        setSearch,
        searchResults,
        setSearchResults,
        handleFavourite,
        filteredRecipes,
        setFilteredRecipes
      }}
    >
      {children}
    </context.Provider>
  );
};
