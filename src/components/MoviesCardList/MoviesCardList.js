import React from 'react';
import '../App/App.js';

function MoviesCardList({children, onExtendClick, isRequired}) {

  return (
    <div className='movies'>
        <ul className="movies__list list">
            {children}
        </ul>
        <button className='movies__more-button button' type="button"
        style={{display: isRequired ? 'block' : 'none' }}
        onClick={onExtendClick}>Ещё</button>
    </div>
    );
}

export default MoviesCardList;
