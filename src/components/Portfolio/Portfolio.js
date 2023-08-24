import React from "react";
import Arrow from "../../images/arrow.svg";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav className="portfolio__list">
        <a
          href="https://melchanova.github.io/how-to-learn/"
          className="portfolio__link portfolio__link-border"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__description">Статичный сайт</p>
          <img
            className="portfolio__image"
            src={Arrow}
            alt="Стрелка для ссылки"
          />
        </a>
        <a
          href="https://melchanova.github.io/russian-travel/"
          className="portfolio__link portfolio__link-border"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__description">Адаптивный сайт</p>
          <img
            className="portfolio__image"
            src={Arrow}
            alt="Стрелка для ссылки"
          />
        </a>
        <a
          href="https://melchanova.github.io/react-mesto-auth/"
          className="portfolio__link"
          target="_blank"
          rel="noreferrer"
        >
          <p className="portfolio__description">Одностраничное приложение</p>
          <img
            className="portfolio__image"
            src={Arrow}
            alt="Стрелка для ссылки"
          />
        </a>
      </nav>
    </section>
  );
}

export default Portfolio;
