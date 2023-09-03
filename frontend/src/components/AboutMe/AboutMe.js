import React from "react";
import Foto from "../../images/my_foto.jpg";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__info">
        <div className="about-me__info-text">
          <h3 className="about-me__name">Марианна</h3>
          <h4 className="about-me__job">Фронтенд-разработчик, 41 год</h4>
          <p className="about-me__text">
            Живу в Липецке, работала в мастером смены на производстве. В одно
            прекрасное время решила изменить свою жизнь и поступила в Яндекс
            Практикум на курс фронтенд-разработчик.
          </p>
          <a
            href="https://github.com/Melchanova"
            className="about-me__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={Foto} alt="Мое фото" className="about-me__foto" />
      </div>
    </section>
  );
}

export default AboutMe;
