import React from 'react';
import searchIcon from '../../images/search-icon.svg'

function SearchForm(props) {

  return (
    <form className="search__form">
        <img className='search__icon' src={searchIcon}></img>
        <input className="search__input" type="search" placeholder="Фильм"/>
        <div className='search__container'>
          <button className="search__button button" type="button"></button>
          <div className="search__separation"></div>
          {props.children}
        </div>
    </form>
    );
}

export default SearchForm;
