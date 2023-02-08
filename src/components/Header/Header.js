import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import closeButton from '../../images/close-button.svg';

function Header({isOpen, onMenuClick, onClose, onSavedMoviesClick}) {

    const { pathname } = useLocation()


  return (
    <header className="header">
        <a className="logo link" href="/"></a>
        <nav>
            <ul className="header__nav list">
                <li className='list-item'>
                    <a href="/movies" className={`header__item link ${pathname==='/movies' ? "active" : ""}`}>Фильмы</a>
                </li>
                <li className='list-item'>
                    <a
                    onClick={onSavedMoviesClick} 
                    href="/saved-movies" 
                    className={`header__item link ${pathname==='/saved-movies' ? "active" : ""}`}>Сохранённые фильмы</a>
                </li>
                <li className='list-item'>
                    <a href="/profile" className='account link'>
                        <span className={`header__item account__text ${pathname==='/profile' ? "active" : ""}`}>Аккаунт</span>
                        <span className='account__icon'></span>
                    </a>
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
                                <a href="/" className={`menu__item link ${pathname==='/' ? "active" : ""}`}>Главная</a>
                            </li>
                            <li>
                                <a href="/movies" className={`menu__item link ${pathname==='/movies' ? "active" : ""}`}>Фильмы</a>
                            </li>
                            <li>
                                <a onClick={onSavedMoviesClick} href="/saved-movies" className={`menu__item link ${pathname==='/saved-movies' ? "active" : ""}`}>Сохраненные фильмы</a>
                            </li>
                            <li>
                                <a href="/profile" className="account link">
                                    <span className={`menu__item header__item account__text ${pathname==='/profile' ? "active" : ""}`}>Аккаунт</span>
                                    <span className='account__icon'></span>
                                </a>
                            </li>
                        </ul>
            </nav>
        </div>
    </header>  );
}

export default Header;
