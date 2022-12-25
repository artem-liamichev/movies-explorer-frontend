import React from 'react';
import { useLocation} from 'react-router-dom';

function MoviesCard({card}) {
 
  const { pathname } = useLocation()
  const deleteButtonRef = React.useRef();
  
  const handleMouseOver = () => {
      deleteButtonRef.current.style.display = 'block'
  }
  const handleMouseLeave = () => {
      deleteButtonRef.current.style.display = 'none'
  }

  return (
    <li className='list-item movie-item'>
      {pathname==='/movies' && (<article className="card">
        <img src={card.link} alt={card.name} className="card__image"/>
            <div className="card__info">
                <div className='card__data'>
                    <h2 className="card__name">{card.name}</h2>
                    <p className='card__length'>{card.length}</p>
                </div>
                <button className="button card__like-button card__like-button_active" type="button"></button>
            </div>
      </article>)}

      {pathname==='/saved-movies' && (<article className="card" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <img src={card.link} alt={card.name} className="card__image"/>
          <div className="card__info">
              <div className='card__data'>
                  <h2 className="card__name">{card.name}</h2>
                  <p className='card__length'>{card.length}</p>
              </div>
              <button className="button card__delete-button" ref={deleteButtonRef} type="button"></button>
          </div>
      </article>)}
    </li>
    );
}

export default MoviesCard;
