import React from 'react';

function LandingHeader() {

  return (
    <header className="landing-header">
        <a className="logo link" href="/"></a>
        <nav>
            <ul className="landing-header__nav list">
                <li className='landing-header__item list-item'>
                    <a href="/signup" className="link">Регистрация</a>
                </li>
                <li className='landing-header__item landing-header__item_name_login list-item'>
                    <a href="/signin" className="link">Войти</a>
                </li>
            </ul>
        </nav>
    </header>  );
}

export default LandingHeader;
