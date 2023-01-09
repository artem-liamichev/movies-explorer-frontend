import React, { useState } from 'react';
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

  const [isCardLiked, setCardLike] = useState(false);
  
  function handleLikeClick() {
    setCardLike((isCardLiked) => !isCardLiked);
    }

  const cardLikeButtonClassName = (`card__like-button ${isCardLiked ? 'card__like-button_active': 'card__like-button_disabled'}`); 


  return (
    <li className='list-item movie-item'>
      {pathname==='/movies' && (<article className="card">
        <a className="card__link" href={card.trailerLink} target="_blank"><img src={`https://api.nomoreparties.co${card.image.url}`} alt={card.nameRU} className="card__image"/></a>
        <div className="card__info">
            <div className='card__data'>
                <h2 className="card__name">{card.nameRU}</h2>
                <p className='card__length'>{
                    (() => {
                        if ((card.duration > 59) && ((card.duration % 60 !== 0))) {
                            return `${Math.floor(card.duration / 60)}ч ${card.duration % 60}м`
                        } else if ((card.duration % 60 === 0)) {
                            return `${Math.floor(card.duration / 60)}ч` 
                        } else {
                            return `${card.duration % 60}м` 
                        }
                    })()
                    }
                </p>
            </div>
            <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
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
