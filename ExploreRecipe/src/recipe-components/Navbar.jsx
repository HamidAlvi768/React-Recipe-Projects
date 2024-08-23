import React, {useState,useEffect} from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './styles.css'

export const Navbar = () => {
  const location = useLocation();
  const [color, setColor] = useState("white");

  useEffect(() => {
    if (location.pathname === "/") {
      setColor("white");
    } else if (location.pathname === "/recipes") {
      setColor("black");
    }
    else if (location.pathname === "/favourite") {
      setColor("black");
    }
    else if (location.pathname === "/details/:id") {
      setColor("black");
    }
  }, [location.pathname]);

  return (
    <nav>
      <ul>
        <li><NavLink activeClassName="active" style={{ color: color }} to="/">Home</NavLink></li>
        <li><NavLink activeClassName="active" style={{ color: color }} to="/recipes">Recipes</NavLink></li>
        <li><NavLink activeClassName="active" style={{ color: color }} to="/favourite">Favourites</NavLink></li>
      </ul>
    </nav>
  )
}
