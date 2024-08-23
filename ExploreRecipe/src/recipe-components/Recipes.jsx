import React, { useState, useEffect, useRef } from 'react'
import { useContextData } from './useContextData'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

export const Recipes = () => {
  const {data, favourite} = useContextData()
  const [searchTerm, setSearchTerm] = useState('')
  const [visibleRecipes, setVisibleRecipes] = useState([])
  const observerRef = useRef()

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredRecipes = Object.values(data).filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    const recipeElements = document.querySelectorAll('.recipe')
    recipeElements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el)
      }
    })
  }, [filteredRecipes])

  return (
    <>
    <div className='search-recipes-container'>
    <FaSearch id="search-icon" />
      <input
      className='search-recipes-input'
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleSearch}
      />
      </div>
    <div className="recipes">
      {Array.isArray(filteredRecipes) && filteredRecipes.length  ? filteredRecipes.map((recipe, index) => (
        <Link style={{ textDecoration: 'none',  color: 'inherit' }} to={`/details/${recipe.id}`} key={index} className="recipe">
          <h2 className="recipe-title">{recipe.title}</h2>
          <p className="recipe-publisher">Publisher: {recipe.publisher}</p>
          <img className="recipe-image" src={recipe.image_url} alt={recipe.title} />
          <p className="recipe-id">ID: {recipe.id}</p>
        </Link>
      )) : <h1>No Recipes Found</h1> }
    </div>
    </>
  )
}
