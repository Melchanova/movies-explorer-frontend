import React from "react";
import AboutMe from "../AboutMe/AboutMe";
import Techs from "../Techs/Techs";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Portfolio from "../Portfolio/Portfolio";

function Main() {
  return (
    <main>
      <AboutMe />
      <Promo />
      <AboutProject />
      <Techs />
      <Portfolio />
    </main>
  );
}

export default Main;
