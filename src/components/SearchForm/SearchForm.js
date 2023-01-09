import React, {useEffect} from 'react';
import searchIcon from '../../images/search-icon.svg'

function SearchForm({children, onSearchClick}) {
  
  const nameInputRef = React.useRef();

  const handleSearchClick = (e) => {
    e.preventDefault();
    onSearchClick(nameInputRef.current.value.toLowerCase())
    localStorage.setItem('inputValue', nameInputRef.current.value);
  }

  const boxInput = () => {
    const inputValue = localStorage.getItem('inputValue');
    if (inputValue!=='null') {
      document.getElementById("input").value = inputValue;  }
  } 
  
  useEffect(() => {
    boxInput();
  }, []);


  return (
    <form className="search">
        <img className='search__icon' src={searchIcon} alt="иконка поиска"></img>
        <input id="input" className="search__input" type="search" placeholder="Фильм" ref={nameInputRef}/>
        <div className='search__container'>
          <button className="search__button button" type="button"
            onClick={handleSearchClick}
          ></button>
          <div className="search__separation"></div>
          {children}
        </div>
    </form>
    );
}

export default SearchForm;
