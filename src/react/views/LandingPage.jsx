import React from "react";
import { Link } from "react-router-dom";
import img from "../../images/pokebola.png";
import "../../Styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <Link to="/home">
        <img src={img} alt="pokebola" />
      </Link>
    </div>
  );
};

export default LandingPage;
