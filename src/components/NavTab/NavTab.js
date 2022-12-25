import React from 'react';

function NavTab() {

  return (
    <nav>
        <ul className='navtab list'>
            <li className='list-item'>
              <a className="navtab__link link" href='#about-project'>О проекте</a>
            </li>
            <li className='list-item'>
              <a className="navtab__link link" href="#techs">Технологии</a>
            </li>
            <li className='list-item'>
              <a className="navtab__link link" href="#student">Студент</a>
            </li>
        </ul>
    </nav>  );
}

export default NavTab;
