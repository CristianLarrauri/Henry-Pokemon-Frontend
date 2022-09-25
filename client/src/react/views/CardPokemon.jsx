import React from "react";
import { Link } from "react-router-dom";
import img from "../../images/pokebola.png";
import "../../Styles/CardPokemon.css";

const CardPokemon = ({
  id,
  name,
  life,
  attack,
  defense,
  speed,
  height,
  weight,
  image,
  types,
}) => {
  return (
    <div className="CardPokemon">
      <div className="CardPokemon-img">
        <Link to={`/home/detail/${id}`}>
          <img src={image ? image : img} alt={name} />
        </Link>
      </div>
      <div className="CardPokemon-name">
        <h2> {name} </h2>
      </div>
      <div className="CardPokemon-types">
        {types?.map((el) => (
          <h5>{el.name}</h5>
        ))}
      </div>
      <div className="CardPokemon-life">
        <p> {life} </p>
        <p> {speed} </p>
      </div>
      <div className="CardPokemon-attack">
        <p> {attack} </p>
        <p> {defense} </p>
      </div>
      <div className="CardPokemon-height">
        <p> {height} </p>
        <p> {weight} </p>
      </div>
    </div>
  );
};

export default CardPokemon;
