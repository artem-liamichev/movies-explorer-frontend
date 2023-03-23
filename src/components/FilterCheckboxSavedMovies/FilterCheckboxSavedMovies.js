import React, {useEffect} from 'react';
import '../App/App.js';
import { useTranslation } from 'react-i18next';

function FilterCheckboxSavedMovies({onFilterClick}) {

  const { t } = useTranslation();

  const checkboxInputRef = React.useRef();

  const handleFilterClick = () => {
    onFilterClick(checkboxInputRef.current.checked);
  }

  return (
    <div className="container">
      <label className="switch" htmlFor="checkbox">
          <input type="checkbox" id="checkbox" ref={checkboxInputRef} onChange={handleFilterClick}/>
          <span className="slider round"></span>
      </label>
      <span className="search__checkbox-text">{t('short-films')}</span>
    </div>
    );
}

export default FilterCheckboxSavedMovies;
