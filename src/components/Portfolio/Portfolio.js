import React from 'react';

function AboutMe() {

  return (
    <section className="portfolio">
        <h2 className="portfolio__title">Портфолио</h2>
            <ul className='portfolio__list'>
                <li className='portfolio__list-item-container'>
                    <a className='portfolio__list-item link' target="_blank" href="https://artem-liamichev.github.io/how-to-learn/">
                        <span className='portfolio__list-item-name'>Статичный сайт</span>
                        <span className='portfolio__list-item-icon'></span>
                    </a>
                </li>
                <li className='portfolio__list-item-container'>
                    <a className='portfolio__list-item link' target="_blank" href="https://artem-liamichev.github.io/russian-travel/index.html">
                        <span className='portfolio__list-item-name'>Адаптивный сайт</span>
                        <span className='portfolio__list-item-icon'></span>
                    </a>
                </li>
                <li className='portfolio__list-item-container'>
                    <a className='portfolio__list-item link' target="_blank" href="https://artem-liamichev.github.io/mesto/index.html">
                        <span className='portfolio__list-item-name'>Одностраничное приложение</span>
                        <span className='portfolio__list-item-icon'></span>
                    </a>
                </li>
            </ul>
    </section>  );
}

export default AboutMe;
