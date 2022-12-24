import React from 'react';

function AboutMe() {

  return (
    <section className="portfolio">
        <h2 className="portfolio__title">Портфолио</h2>
            <ul className='portfolio__list'>
                <li className='portfolio__list-item'>
                    <p className='portfolio__list-item-name'>Статичный сайт</p>
                    <a className='portfolio__list-item-link link' href="https://artem-liamichev.github.io/how-to-learn/">&#129125;</a>
                </li>
                <li className='portfolio__list-item'>
                    <p className='portfolio__list-item-name'>Адаптивный сайт</p>
                    <a className='portfolio__list-item-link link' href="https://artem-liamichev.github.io/russian-travel/index.html">&#129125;</a>
                </li>
                <li className='portfolio__list-item'>
                    <p className='portfolio__list-item-name'>Одностраничное приложение</p>
                    <a className='portfolio__list-item-link link' href="https://artem-liamichev.github.io/mesto/index.html">&#129125;</a>
                </li>
            </ul>
    </section>  );
}

export default AboutMe;
