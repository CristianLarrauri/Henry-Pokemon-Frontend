import {
  GET_POKEMONS,
  GET_POKEMON_NAME,
  GET_POKEMON_DETAIL,
  GET_TYPES,
  CREATE_POKEMON,
  GET_POKEMON_FILTER,
  POWER_FILTER,
} from "./actions";

const initialState = {
  pokemons: [],
  pokemonsCopy: [],
  pokemonDetail: {},
  pokemonsFilter: [],
  types: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //.................//

    case GET_POKEMONS:
      return {
        ...state,
        pokemons: payload,
        pokemonsCopy: payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: payload,
      };

    //.................//

    case GET_POKEMON_NAME:
      return {
        ...state,
        pokemons: payload,
      };
    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: payload,
      };

    //.................//

    case CREATE_POKEMON:
      return {
        ...state,
      };

    //.................//

    case GET_POKEMON_FILTER:
      return {
        ...state,
        pokemonsFilter: payload,
      };

    case POWER_FILTER:
      let pokemon = state.pokemonsFilter;
      if (payload === "minPower") {
        pokemon = pokemon.filter((pokemon) => pokemon.life < 45);
      }
      if (payload === "maxPower") {
        pokemon = pokemon.filter((pokemon) => pokemon.life >= 72);
      }

      return {
        ...state,
        pokemons: pokemon,
      };

    default:
      return state;
  }
};

export default rootReducer;
