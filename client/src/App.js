import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "./react/views/LandingPage";
import Home from "./react/views/Home";
import PokemonDetail from "./react/components/PokemonDetail";
import FormCreatePokemon from "./react/components/FormCreatePokemon";
import NavBar from "./react/views/NavBar";

function App() {
  return (
    <div className="App">
      <Route path="/home" component={NavBar} />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route path="/home/create" component={FormCreatePokemon} />
      <Route path="/home/detail/:id" component={PokemonDetail} />
    </div>
  );
}

export default App;
