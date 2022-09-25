const axios = require("axios");
const { Pokemon, Type, Pokemon_Type } = require("../db");

// TRAIGO LOS POKEMON DE LA API Y LOS GUARDO EN BASE DE DATOS
const getApiInfo = async () => {
  try {
    let request = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"
    );

    let requestUrl = request.data.results.map((pokemon) =>
      axios.get(pokemon.url)
    );

    let subRequest = await axios.all(requestUrl);

    let pokemonData = subRequest.map((pokemon) => pokemon.data);

    let info = pokemonData.map((pokemon) => {
      return {
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        life: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat,
        image: pokemon.sprites.other.dream_world.front_default,
        isDefault: pokemon.is_default,
        types: pokemon.types.map((pokemon) => pokemon.type.name),
      };
    });

    info.forEach(async (pokemon) => {
      await createPokemon(pokemon);
    });

    return info;
  } catch (error) {
    console.log("ERROR EN getApiInfo", error);
  }
};

// TRAIGO LOS TIPOS DE LA API Y LOS GUARDO EN BASE DE DATOS
const getTypeInfo = async () => {
  try {
    let request = await axios.get("https://pokeapi.co/api/v2/type");

    let info = request.data.results.map((type) => type.name);

    info.forEach((type) => {
      Type.findOrCreate({
        where: { name: type },
      });
    });

    return info;
  } catch (error) {
    console.log("ERROR EN getTypeInfo", error);
  }
};

// TRAIGO LOS POKEMON CON SUS TIPOS DESDE BASE DE DATOS
const getDbInfo = async () => {
  try {
    return await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.log("ERROR EN getDbInfo", error);
  }
};

// CREA UN POKEMON
const createPokemon = async (dataPokemon) => {
  try {
    const {
      name,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      isDefault,
      types,
    } = dataPokemon;

    const newPokemon = await Pokemon.create({
      name,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      isDefault,
    });

    const pokemonType = await Type.findAll({
      where: { name: types },
    });

    await newPokemon.addType(pokemonType);

    return newPokemon;
  } catch (error) {
    console.log("ERROR EN createPokemon", error);
  }
};

module.exports = {
  getApiInfo,
  getTypeInfo,
  getDbInfo,
  createPokemon,
};
