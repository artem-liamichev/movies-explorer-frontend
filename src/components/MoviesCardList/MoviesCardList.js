import React from 'react';
import '../App/App.js';

function MoviesCardList(props) {

  return (
    <div className='movies'>
        <ul className="movies__list list">
            {props.children}
        </ul>
        <button className='movies__more-button button'>Ещё</button>
    </div>
    );
}

export default MoviesCardList;
