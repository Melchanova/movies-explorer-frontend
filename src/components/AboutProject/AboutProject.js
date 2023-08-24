import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="about">
      <div className="about-project__container">
        <h2 className="about-project__title">О проекте</h2>
        <ul className="about-project__text-info">
          <li className="about-project__info">
            <h3 className="about-project__info-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__info-text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className="about-project__info">
            <h3 className="about-project__info-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__info-text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="about-project__work">
          <h3 className="about-project__work-title about-project__work-title_green">
            1 неделя
          </h3>
          <h3 className="about-project__work-title">4 недели</h3>
          <p className="about-project__work-time">Back-end</p>
          <p className="about-project__work-time">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
