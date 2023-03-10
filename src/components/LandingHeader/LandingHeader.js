import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';

function LandingHeader() {

    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
      };

  return (
    <header className="landing-header">
        <a className="logo link" href="/"></a>
        <nav>
            <ul className="landing-header__nav list">
                <li className='landing-header__item list-item'>
                    <a href="/signup" className="link">{t('registration')}</a>
                </li>
                <li className='landing-header__item landing-header__item_name_login list-item'>
                    <a href="/signin" className="link">{t('login')}</a>
                </li>
                <li className="header__lang-links">
                    <a onClick={() => changeLanguage("en")} className={`${i18n.language==='en' ? 'header__lang-link header__lang-link_active' : 'header__lang-link'}`} data-btn="en">En</a>
                    <a onClick={() => changeLanguage("ru")} className={`${i18n.language==='ru' ? 'header__lang-link header__lang-link_active' : 'header__lang-link'}`} data-btn="ru">Ru</a>
                </li>
            </ul>
        </nav>
    </header>  );
}

export default LandingHeader;
