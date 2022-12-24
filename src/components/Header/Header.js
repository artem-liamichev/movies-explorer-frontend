import React, { useState } from 'react';
import { Link, NavLink, useLocation} from 'react-router-dom';
import closeButton from '../../images/close-button.svg';

function Header({isOpen, onMenuClick, onClose}) {

    const { pathname } = useLocation()


  return (
    <header className="header">
        <a className="header__logo link" href="/"></a>
        <nav className="header__links">
            <a href="/movies" className={`header__link link ${pathname==='/movies' ? "active" : ""}`}>Фильмы</a>
            <a href="/saved-movies" className={`header__link link ${pathname==='/saved-movies' ? "active" : ""}`}>Сохранённые фильмы</a>
            <a href="/profile" className='header__link-account link'>
                <li className={`header__link header__link-right ${pathname==='/profile' ? "active" : ""}`}>Аккаунт</li>
                <li className='header__link-icon'></li>
            </a>
        </nav>
        <nav className={`header__menu ${isOpen ? "" : "header__menu_active"}`}>
            <button className='header__menu-button button' onClick={onMenuClick}></button>
        </nav>
        <div className={`menu ${isOpen ? "menu_opened" : ""}`}>
                <div className='blur'></div>
                <button className="menu__close-button button" type="button" onClick = {onClose}>
                    <img className="menu__image-close" src={closeButton} alt="закрыть меню"/>
                </button>
                <div className="menu__content">
                        <ul className="menu__list">
                            <li>
                                <a href="/" className={`menu__item link ${pathname==='/' ? "active" : ""}`}>Главная</a>
                            </li>
                            <li>
                                <a href="/movies" className={`menu__item link ${pathname==='/movies' ? "active" : ""}`}>Фильмы</a>
                            </li>
                            <li>
                                <a href="/saved-movies" className={`menu__item link ${pathname==='/saved-movies' ? "active" : ""}`}>Сохраненные фильмы</a>
                            </li>
                            <li>
                                <a href="/profile" className="header__link-account link">
                                    <span className={`menu__item header__link header__link-right ${pathname==='/profile' ? "active" : ""}`}>Аккаунт</span>
                                    <span className='header__link-icon'></span>
                                </a>
                            </li>
                        </ul>
            </div>
        </div>
    </header>  );
}

export default Header;
