const { Router } = require("express");
const { Pokemon, Type } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let infoPokemons = await Pokemon.findAll({
      order: [["name", "ASC"]],
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return res.status(200).send(infoPokemons);
  } catch (error) {
    console.log("ERROR EN GET /FILTER", error);
  }
});

module.exports = router;
