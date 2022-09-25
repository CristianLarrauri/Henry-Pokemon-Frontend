import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  powerFilter,
  getPokemons,
  getTypes,
  getPokemonFilter,
} from "../../redux/actions";
import Paginado from "../views/Paginado";
import CardPokemon from "../views/CardPokemon";

const CardsPokemons = () => {
  const dispatch = useDispatch();
  const pokemonFilter = useSelector((state) => state.pokemonsFilter);
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);

  //.........................................................................................//
  // PAGINADO
  const [page, setPage] = useState(0);

  const handlePrev = (event) => {
    event.preventDefault();
    if (page <= 1) {
      setPage(1);
    } else {
      setPage(page - 12);
    }
  };

  const handleNext = (event) => {
    event.preventDefault();
    if (pokemons.length < 12) {
      return;
    } else {
      setPage(page + 12);
    }
  };

  const paginado = (page) => {
    setPage(page * 12);
  };

  //.........................................................................................//
  // ORDENAMIENTO

  const [property, setProperty] = useState("name");
  const [order, setOrder] = useState("ASC");

  const handleOrderName = (event) => {
    event.preventDefault();
    setProperty("name");
    setOrder(event.target.value);
  };

  const handleOrderAttack = (event) => {
    event.preventDefault();
    setProperty("attack");
    setOrder(event.target.value);
  };

  //.........................................................................................//
  //FILTRADO

  const [api, setApi] = useState("");
  const [filtertype, setFiltertype] = useState("");

  const handleFilterApi = (event) => {
    event.preventDefault();
    setApi(event.target.value);
  };

  const handleFilterType = (event) => {
    event.preventDefault();
    setFiltertype(event.target.value);
  };

  const handleFilterPower = (event) => {
    event.preventDefault();
    dispatch(powerFilter(event.target.value));
  };

  //.........................................................................................//

  useEffect(() => {
    dispatch(getPokemons(page, property, order, api, filtertype));
    dispatch(getTypes());
    dispatch(getPokemonFilter(page));
  }, [dispatch, page, property, order, api, filtertype]);

  //.........................................................................................//

  return (
    <div>
      {/* ...............FILTROS............... */}
      <div>
        <select onChange={(event) => handleFilterApi(event)}>
          <option value="">All Pokemons</option>
          <option value="true">Existing</option>
          <option value="false">Created</option>
        </select>

        <select onChange={(event) => handleFilterType(event)}>
          <option value="">All Types</option>
          {types?.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <select onChange={(event) => handleFilterPower(event)}>
          <option value="minPower">Min Power</option>
          <option value="maxPower">Max Power</option>
        </select>
      </div>
      {/* ...............ORDENAMIENTOS............... */}
      <div>
        <select onChange={(event) => handleOrderName(event)}>
          <option value="ASC">A-Z</option>
          <option value="DESC">Z-A</option>
        </select>
        <select onChange={(event) => handleOrderAttack(event)}>
          <option value="ASC">Attack Min</option>
          <option value="DESC">Attack Max</option>
        </select>
      </div>
      {/* ...............PAGINADO SUP............... */}
      <div>
        <Paginado pokemonsTotal={pokemonFilter.length} paginado={paginado} />
        <button
          onClick={(event) => {
            handlePrev(event);
          }}
          disabled={page <= 0}
        >
          {"<"}
        </button>
        <button
          onClick={(event) => {
            handleNext(event);
          }}
          disabled={pokemons.length < 12}
        >
          {">"}
        </button>
      </div>
      {/* ...............CARD............... */}
      <div className="CardsPokemonsConteiner">
        {pokemons?.map((pokemon) => {
          return (
            <CardPokemon
              key={pokemon.id}
              id={pokemon.id}
              image={pokemon.image}
              name={pokemon.name}
              types={pokemon.types}
            />
          );
        })}
      </div>
      {/* ...............PAGINADO INF............... */}
      <div>
        <button
          onClick={(event) => {
            handlePrev(event);
          }}
          disabled={page <= 0}
        >
          {"<"}
        </button>
        <button
          onClick={(event) => {
            handleNext(event);
          }}
          disabled={pokemons.length < 12}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default CardsPokemons;
