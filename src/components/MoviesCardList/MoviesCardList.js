import React from 'react';
import '../App/App.js';

function MoviesCardList(props) {

  return (
    <div className='movies'>
        <section className="movies__list">
            {props.children}
        </section>
        <button className='movies__more-button button'>Ещё</button>
    </div>
    );
}

export default MoviesCardList;
