import React, {useEffect} from 'react';
import searchIcon from '../../images/search-icon.svg'

function SearchForm({children, onSavedMoviesSearchClick}) {
  
  const nameInputRef = React.useRef();

  const handleSavedMoviesSearchClick = (e) => {
    e.preventDefault();
    onSavedMoviesSearchClick(nameInputRef.current.value.toLowerCase())
  }

  return (
    <form className="search">
        <img className='search__icon' src={searchIcon} alt="иконка поиска"></img>
        <input id="input" className="search__input" type="search" placeholder="Фильм" ref={nameInputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSavedMoviesSearchClick(e);              }
            }}/>
        <div className='search__container'>
          <button className="search__button button" type="button"
            onClick={handleSavedMoviesSearchClick}
          ></button>
          <div className="search__separation"></div>
          {children}
        </div>
    </form>
    );
}

export default SearchForm;
