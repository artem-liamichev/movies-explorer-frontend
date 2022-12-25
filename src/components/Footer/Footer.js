import React from 'react';

function Footer() {

  return (
    <footer className="footer">
        <p className="footer__info">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__container">
            <span className="footer__copyright">&copy; 2022</span>
            <nav>
                <ul className='footer__list list'>
                    <li className='list-item'>
                        <a className="footer__link link" href="https://practicum.yandex.ru" target="_blank">Яндекс.Практикум</a>
                    </li>
                    <li className='list-item'>
                        <a className="footer__link link" href="https://github.com/artem-liamichev" target="_blank">GitHub</a>
                    </li>
                </ul>
            </nav>
        </div>
    </footer>  );
}

export default Footer;
