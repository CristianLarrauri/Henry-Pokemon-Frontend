import axios from "axios";

export const GET_POKEMONS = "GET_POKEMON";
export const GET_TYPES = "GET_TYPES";

export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";

export const CREATE_POKEMON = "CREATE_POKEMON";

export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";

export const GET_POKEMON_FILTER = "GET_POKEMON_FILTER";
export const POWER_FILTER = "POWER_FILTER";

//.........................................................................................//
// POKEMONS

// ASYNC AWAIT
export const getPokemons = (page, property, order, api, filtertype) => {
  return async (dispatch) => {
    let info = await axios.get(
      `http://localhost:3001/pokemons?page=${page}&property=${property}&order=${order}&api=${api}&filtertype=${filtertype}`
    );

    dispatch({ type: GET_POKEMONS, payload: info.data });
  };
};

//PROMESAS;
// export const getPokemons = (page, property, order, api, filtertype) => {
//   return async (dispatch) => {
//     return fetch(
//       `http://localhost:3001/pokemons?page=${page}&property=${property}&order=${order}&api=${api}&filtertype=${filtertype}`
//     )
//       .then((pepe) => pepe.json())
//       .then((tuki) => dispatch({ type: GET_POKEMONS, payload: tuki }));
//   };
// };

//.........................................................................................//
// NAME

export const getPokemonName = (name) => {
  return async (dispatch) => {
    let info = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
    dispatch({ type: GET_POKEMON_NAME, payload: info.data });
  };
};

//.........................................................................................//
// DETAIL

export const getPokemonDetail = (id) => {
  return async (dispatch) => {
    let info = await axios.get(`http://localhost:3001/pokemons/${id}`);
    dispatch({ type: GET_POKEMON_DETAIL, payload: info.data });
  };
};

//.........................................................................................//
// TYPES

export const getTypes = () => {
  return async (dispatch) => {
    let info = await axios.get("http://localhost:3001/types");
    dispatch({ type: GET_TYPES, payload: info.data });
  };
};

//.........................................................................................//
// CREATE

export const createPokemon = (payload) => {
  return async () => {
    let info = await axios.post("http://localhost:3001/pokemons", payload);
    return info;
  };
};

//.........................................................................................//
// FILTER

export const getPokemonFilter = () => {
  return async (dispatch) => {
    let info = await axios.get(`http://localhost:3001/filter`);
    dispatch({ type: GET_POKEMON_FILTER, payload: info.data });
  };
};

export const powerFilter = (payload) => {
  return {
    type: POWER_FILTER,
    payload: payload,
  };
};

// export const filterTypes = (payload) => {
//   return {
//     type: FILTER_TYPES,
//     payload,
//   };
// };

// export const filterApi = (payload) => {
//   return {
//     type: FILTER_API,
//     payload,
//   };
// };

//.........................................................................................//
// ORDER
