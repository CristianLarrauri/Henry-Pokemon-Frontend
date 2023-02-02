import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonName } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  //...................................................................................//
  // MANEJADORES

  const handleName = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getPokemonName(name));
  };

  //...................................................................................//
  // RENDERIZADO

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokemon"
        onChange={(event) => handleName(event)}
      />
      <button onClick={(event) => handleSubmit(event)}>Search</button>
    </div>
  );
};

export default SearchBar;
