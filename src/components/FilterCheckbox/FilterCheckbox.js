import React from 'react';
import '../App/App.js';

function FilterCheckbox() {

  return (
    <div className="container">
      <label className="switch" htmlFor="checkbox">
          <input type="checkbox" id="checkbox" />
          <div className="slider round"></div>
      </label>
      <span className="search__checkbox-text">Короткометражки</span>
    </div>
    );
}

export default FilterCheckbox;
