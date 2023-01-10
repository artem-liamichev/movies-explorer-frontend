import React from 'react';
import '../App/App.js';

function MoviesCardList({children, onExtendClick, isRequired, isResultEmpty}) {
    console.log('MoviesCardListisResultEmpty:', isResultEmpty)

  return (
    <div className='movies'
        style={{display: isResultEmpty ? 'none' : 'flex' }}
    >
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
