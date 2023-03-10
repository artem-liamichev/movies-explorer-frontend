import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import closeButton from '../../images/close-button.svg';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';

function Header({isOpen, onMenuClick, onClose}) {
    
    const { t, i18n } = useTranslation();
    const { pathname } = useLocation()

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
      };

  return (
    <header className="header">
        <a className="logo link" href="/"></a>
        <nav>
            <ul className="header__nav list">
                <li className='list-item'>
                    <a href="/movies" className={`header__item link ${pathname==='/movies' ? "active" : ""}`}>{t('movies')}</a>
                </li>
                <li className='list-item'>
                    <a
                    href="/saved-movies" 
                    className={`header__item link ${pathname==='/saved-movies' ? "active" : ""}`}>{t('saved-movies')}</a>
                </li>
                <li className='list-item'>
                    <a href="/profile" className='account link'>
                        <span className={`header__item account__text ${pathname==='/profile' ? "active" : ""}`}>{t('account')}</span>
                        <span className='account__icon'></span>
                    </a>
                </li>
                <li className="header__lang-links">
                    <a onClick={() => changeLanguage("en")} className={`${i18n.language==='en' ? 'header__lang-link header__lang-link_active' : 'header__lang-link'}`} data-btn="en">En</a>
                    <a onClick={() => changeLanguage("ru")} className={`${i18n.language==='ru' ? 'header__lang-link header__lang-link_active' : 'header__lang-link'}`} data-btn="ru">Ru</a>
                </li>
            </ul>
        </nav>
        <nav className={`header__menu ${isOpen ? "" : "header__menu_active"}`}>
            <button className='header__menu-button button' onClick={onMenuClick}></button>
        </nav>
        <div className={`menu ${isOpen ? "menu_opened" : ""}`}>
                <div className='blur'></div>
                <button className="menu__close-button button" type="button" onClick = {onClose}>
                    <img className="menu__image-close" src={closeButton} alt="закрыть меню"/>
                </button>
                <nav className="menu__content">
                        <ul className="menu__nav list">
                            <li>
                                <a href="/" className={`menu__item link ${pathname==='/' ? "active" : ""}`}>{t('home-page')}</a>
                            </li>
                            <li>
                                <a href="/movies" className={`menu__item link ${pathname==='/movies' ? "active" : ""}`}>{t('movies')}</a>
                            </li>
                            <li>
                                <a href="/saved-movies" className={`menu__item link ${pathname==='/saved-movies' ? "active" : ""}`}>{t('saved-movies')}</a>
                            </li>
                            <li>
                                <a href="/profile" className="account link">
                                    <span className={`menu__item header__item account__text ${pathname==='/profile' ? "active" : ""}`}>{t('account')}</span>
                                    <span className='account__icon'></span>
                                </a>
                            </li>
                        </ul>
            </nav>
        </div>
    </header>  );
}

export default Header;
