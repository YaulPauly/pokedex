import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Pokemon, Items, Pokemons } from "./pages";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Pokemons />}/>
          <Route path="/pokemons/:name" element={<Pokemon />}/>
          <Route path="/pokemons" element={<Pokemons />}/>
          <Route path="/items" element={<Items />}/> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
