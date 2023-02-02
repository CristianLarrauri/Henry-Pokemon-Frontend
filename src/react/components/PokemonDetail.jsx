import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../../redux/actions";
import img from "../../images/pokebola.png";

import "../../Styles/PokemonDetail.css";

const PokemonDetail = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonDetail);
  const params = useParams();

  const [loading, setloading] = useState(true);

  useEffect(() => {
    dispatch(getPokemonDetail(params.id)).then(() => setloading(false));
  }, [dispatch, params.id]);

  //...................................................................................//
  // RENDERIZADO



  return (
    <div className="PokemonDetail">
      {loading ? (
        <span>Cargando</span>
      ) : (
        <div>
          <div className="PokemonDetail-name">
            <h2>{pokemon.name}</h2>
            <img
              className="img-detail"
              src={pokemon.image ? pokemon.image : img}
              alt={pokemon.image}
            />
            <h4>#{pokemon.id}</h4>
          </div>
          <div className="PokemonDetail-skills">
            <div className="PokemonDetail-skills-cont">
              <h5>
                <small>Life: {pokemon.life}</small>
              </h5>
              <h5>
                <small>Height: {pokemon.height}</small>{" "}
              </h5>
              <h5>
                <small> Weight: {pokemon.weight}</small>
              </h5>
            </div>
            <div className="PokemonDetail-skills-cont">
              {pokemon.types?.map((el) => {
                return <h5>{el.name}</h5>;
              })}
            </div>
            <div className="PokemonDetail-skills-cont">
              <h5>
                <small>Attack: {pokemon.attack}</small>
              </h5>
              <h5>
                <small>Defense: {pokemon.defense}</small>
              </h5>
              <h5>
                <small>Speed: {pokemon.speed}</small>
              </h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
