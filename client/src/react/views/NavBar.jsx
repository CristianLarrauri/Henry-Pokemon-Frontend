import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons } from "../../redux/actions";
import SearchBar from "../components/SearchBar";
import imgPoke from "../../images/pokebola.png";
import imgHome from "../../images/landing.png";

import "../../Styles/NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [page, setPage] = useState(0);
  const [property, setProperty] = useState("name");
  const [order, setOrder] = useState("ASC");
  const [api, setApi] = useState("");
  const [filtertype, setFiltertype] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getPokemons(page, property, order, api, filtertype));
    history.push("/home");
  };

  useEffect(() => {
    dispatch(getPokemons(page, property, order, api, filtertype));
  }, [dispatch]);

  return (
    <div>
      <div className="NavBar">
        <Link to={"/home"}>
          <img
            className="NavBar-home"
            src={imgHome}
            alt="home"
            onClick={(event) => handleClick(event)}
          />
        </Link>
        <Link to={"/home/create"}>
          <img className="NavBar-create" src={imgPoke} alt="poke" />
        </Link>
      </div>
      <div>
        <SearchBar />
      </div>
    </div>
  );
};

export default NavBar;
