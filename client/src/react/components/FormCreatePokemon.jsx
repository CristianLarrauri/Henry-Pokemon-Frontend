import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getTypes } from "../../redux/actions";
import CardPokemon from "../views/CardPokemon";
import "../../Styles/FormCreatePokemon.css";

const FormCreatePokemon = () => {
  const dispatch = useDispatch();

  const types = useSelector((state) => state.types);

  const [input, setInput] = useState({
    name: "",
    life: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    image: "",
    types: [],
  });

  const [error, setError] = useState({});

  const [errorButton, setErrorButton] = useState(
    Object.values(error).length !== 0 ? true : false
  );

  //...................................................................................//
  //VALIDACIONES

  const validation = (input) => {
    let error = {};

    if (
      !/^[a-zA-Z\s]*$/.test(input.name) ||
      typeof input.name !== "string" ||
      !input.name ||
      input.name.length < 2
    ) {
      error.name = "Name invalido";
    }

    if (!input.life || input.life < 0) {
      error.life = "Life invalido";
    }
    if (!input.speed || input.speed < 0) {
      error.speed = "Speed invalido";
    }
    if (!input.attack || input.attack < 0) {
      error.attack = "Attack invalido";
    }
    if (!input.defense || input.defense < 0) {
      error.defense = "Defense invalido";
    }
    if (!input.height || input.height < 0) {
      error.height = "Height invalido";
    }
    if (!input.weight || input.weight < 0) {
      error.weight = "Weight invalido";
    }
    if (!input.types || input.types.length < 1) {
      error.types = "Types invalido";
    }

    return error;
  };

  //...................................................................................//
  // MANEJADORES

  const handleChange = (event) => {
    event.preventDefault();

    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setErrorButton(validation(input));
  };

  const handleSelectType = (event) => {
    event.preventDefault();

    setInput({
      ...input,
      types: [...new Set([...input.types, event.target.value])],
    });

    setErrorButton(validation(input));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError(validation(input));

    let error = validation(input);

    if (Object.values(error).length !== 0) {
      alert("Error in the required fields");
      // alert(Object.entries(error));
    } else {
      dispatch(createPokemon(input));

      alert("Pokemon successfully created!");

      setInput({
        name: "",
        life: 0,
        speed: 0,
        attack: 0,
        defense: 0,
        height: 0,
        weight: 0,
        image: "",
        types: [],
      });
    }
  };

  // const handleDeleteType = (event) => {
  //   event.preventDefault();

  //   setInput({
  //     ...input,
  //     types: input.types.filter((type) => type !== event),
  //   });
  // };

  //...................................................................................//

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  //...................................................................................//
  // RENDERIZADO

  return (
    <div className="FormCreatePokemon-container">
      <div className="FormCreatePokemon">
        <form onSubmit={(event) => handleSubmit(event)}>
          {/* .............................. */}
          <label>Name: </label>
          <div>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(event) => handleChange(event)}
            />
            {error.name && (
              <h5>
                <small>{error.name}</small>
              </h5>
            )}
          </div>

          {/* .............................. */}
          <label>Life: </label>
          <div>
            <input
              type="number"
              value={input.life}
              name="life"
              onChange={(event) => handleChange(event)}
            />
            {error.life && (
              <h5>
                <small>{error.life}</small>
              </h5>
            )}
          </div>
          {/* .............................. */}
          <label>Speed: </label>
          <div>
            <input
              type="number"
              value={input.speed}
              name="speed"
              onChange={(event) => handleChange(event)}
            />
            {error.speed && (
              <h5>
                <small>{error.speed}</small>
              </h5>
            )}
          </div>
          {/* .............................. */}
          <label>Attack: </label>
          <div>
            <input
              type="number"
              value={input.attack}
              name="attack"
              onChange={(event) => handleChange(event)}
            />
            {error.attack && (
              <h5>
                <small>{error.attack}</small>
              </h5>
            )}
          </div>
          {/* .............................. */}
          <label>Defense: </label>
          <div>
            <input
              type="number"
              value={input.defense}
              name="defense"
              onChange={(event) => handleChange(event)}
            />
            {error.defense && (
              <h5>
                <small>{error.defense}</small>
              </h5>
            )}
          </div>
          {/* .............................. */}
          <label>Height: </label>
          <div>
            <input
              type="number"
              value={input.height}
              name="height"
              onChange={(event) => handleChange(event)}
            />
            {error.height && (
              <h5>
                <small>{error.height}</small>
              </h5>
            )}
          </div>
          {/* .............................. */}
          <label>Weight: </label>
          <div>
            <input
              type="number"
              value={input.weight}
              name="weight"
              onChange={(event) => handleChange(event)}
            />
            {error.weight && (
              <h5>
                <small>{error.weight}</small>
              </h5>
            )}
          </div>
          {/* .............................. */}
          <label>Image: </label>
          <div>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={(event) => handleChange(event)}
            />
          </div>
          {/* .............................. */}
          <label>Types: </label>
          <div>
            <select onChange={(event) => handleSelectType(event)}>
              {types?.map((type) => (
                <option value={type.name} key={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            {/* {input.types.map((type) => {
              return (
                <div key={type}>
                  <p>{type}</p>
                  <button onClick={() => handleDeleteType(type)}>x</button>
                </div>
              );
            })} */}
          </div>
          <br />
          {/* ...................................*/}
          <div>
            <button
              type="submit"
              disabled={Object.values(errorButton).length !== 0 ? true : false}
            >
              Crear Pokemon
            </button>
          </div>
        </form>
      </div>
      <br />
      <div className="FormCreatePokemon">
        <div>
          <h5> {input.name} </h5>
        </div>
        <img src={input.image} />
        <div className="FormCreatePokemon-skills">
          <div>
            <p>
              <small>Life: {input.life}</small>
            </p>
            <p>
              <small>Speed: {input.speed}</small>
            </p>
          </div>
          <div>
            <p>
              <small>Attack: {input.attack}</small>
            </p>
            <p>
              <small>Defense: {input.defense}</small>
            </p>
          </div>
          <div>
            <p>
              <small>Height: {input.height}</small>
            </p>
            <p>
              <small>Weight: {input.weight}</small>
            </p>
          </div>
        </div>
        <div className="FormCreatePokemon-types">
          {input.types?.map((el) => (
            <p>
              <small>{el}</small>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormCreatePokemon;
