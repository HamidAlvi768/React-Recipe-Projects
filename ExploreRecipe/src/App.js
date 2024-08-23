import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Navbar} from './recipe-components/Navbar';
import {Home} from './recipe-components/Home';
import {Recipes} from './recipe-components/Recipes';
import {Favourite} from './recipe-components/Favourite';
import { ContextProvider } from './recipe-components/context';
import { Details } from './recipe-components/Details';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar />
      <Routes>
        {/* <Route path="/" element={<Navbar />}> */}
          <Route index element={<Home />} />
          <Route path="details/:id" element={<Details />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="favourite" element={<Favourite />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
