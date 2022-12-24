import React from 'react';

function Footer() {

  return (
    <footer className="footer">
        <p className="footer__info">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__copyright">
            <p className="footer__date">&copy; 2022</p>
            <ul className='footer__links'>
                <a className="footer__link link" href="https://practicum.yandex.ru">Яндекс.Практикум</a>
                <a className="footer__link link" href="https://github.com/artem-liamichev">GitHub</a>
            </ul>
        </div>
    </footer>  );
}

export default Footer;
