const { Router } = require("express");
const { Type } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let info = await Type.findAll();

    res.status(200).send(info);
  } catch (error) {
    console.log("ERROR EN RUTA GET/TYPE", error);
  }
});

module.exports = router;
