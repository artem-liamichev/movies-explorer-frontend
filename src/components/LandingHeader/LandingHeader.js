import React from 'react';

function LandingHeader() {

  return (
    <header className="landing-header">
        <a className="header__logo link" href="/"></a>
        <div className="landing-header__links">
            <a href="/signup" className="header__link landing-header__link link">Регистрация</a>
            <a href="/signin" className="header__link landing-header__link landing-header__link_login link">Войти</a>
        </div>
    </header>  );
}

export default LandingHeader;
