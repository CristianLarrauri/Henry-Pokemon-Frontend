const { Router } = require("express");
const { createPokemon, getDbInfo } = require("../Utils/utils");
const { Pokemon, Type } = require("../db");

const router = Router();

//.........................................................................................//
// GET /pokemons &&  GET /pokemons?name="..."  --> FUNCIONANDO

router.get("/", async (req, res) => {
  try {
    let { name } = req.query;
    let info = await getDbInfo();

    if (name) {
      let infoPokemonName = info.filter(
        (poke) => poke.name.toLowerCase() === name.toLowerCase()
      );

      infoPokemonName.length
        ? res.status(200).send(infoPokemonName)
        : res.status(404).send("No se encontro el pokemon");
    }
    if (req.query.filtertype) {
      let infoFilterType = await Pokemon.findAll({
        Offset: req.query.page,
        limit: 12,
        order: [[req.query.property, req.query.order]],
        include: {
          where: {
            name: req.query.filtertype,
          },
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      res.status(200).send(infoFilterType);
    }

    if (req.query.api) {
      let infoFilter = await Pokemon.findAll({
        where: {
          isDefault: req.query.api,
        },
        Offset: req.query.page,
        limit: 12,
        order: [[req.query.property, req.query.order]],
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      res.status(200).send(infoFilter);
    } else {
      let infoPokemonsTotal = await Pokemon.findAll({
        offset: req.query.page,
        limit: 12,
        order: [[req.query.property, req.query.order]],
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return res.status(200).send(infoPokemonsTotal);
    }
  } catch (error) {
    console.log("ERROR EN RUTA GET A /POKEMON", error);
  }
});

//.........................................................................................//
//  GET /pokemons/{idPokemon} --> FUNCIONANDO

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let info = await getDbInfo();
    if (id) {
      let pokemon = info.find((pokemon) => pokemon.id == id);
      pokemon
        ? res.status(200).send(pokemon)
        : res.status(404).send("No esta el detalle del pokemon");
    }
  } catch (error) {
    console.log("ERROR EN RUTA GET A /POKEMON POR ID", error);
  }
});

//.........................................................................................//
// POST /pokemons --> FUNCIONANDO

router.post("/", async (req, res) => {
  try {
    let dataPokemon = req.body;
    let info = await getDbInfo();

    if (!dataPokemon.name) {
      return res.status(404).send("Faltan datos obligatorios");
    }
    if (dataPokemon.name) {
      let pokemon = info.find((pokemon) => pokemon.name === dataPokemon.name);
      if (!pokemon) {
        createPokemon(dataPokemon);
        return res.status(200).send(dataPokemon);
      } else {
        return res.status(404).send("El pokemon ya existe");
      }
    }
  } catch (error) {
    return res.status(400).send("ERROR EN POST/POKEMONS", error);
  }
});

//.........................................................................................//
// DELETE /pokemons --> FUNCIONANDO
router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;

    if (id) {
      let info = await Pokemon.destroy({
        where: {
          id,
        },
      });
    }
    return res.status(200).send("Pokemon borrado con exito");
  } catch (error) {
    return res.status(400).send("ERROR EN DELETE/POKEMONS", error);
  }
});

//.........................................................................................//
// PUT /pokemons --> FUNCIONANDO
router.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let dataPokemon = req.body;

    let info = await Pokemon.update(dataPokemon, {
      where: { id },
    });
  } catch (error) {
    return res.status(400).send("ERROR EN PUT/POKEMONS", error);
  }
});

module.exports = router;
