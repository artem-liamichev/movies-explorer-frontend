import React, {useEffect} from 'react';
import { useLocation} from 'react-router-dom';
import useMedia from '../../hooks/useMedia';
import { useTranslation } from 'react-i18next';

function MoviesCard({card, onCardLike, onCardDelete, likedCards}) { 
    const { t, i18n } = useTranslation();
    const isMobile = useMedia('(min-width: 320px) and (max-width: 500px)');  
    const isLiked = likedCards.some(i => i.movieId === card.id);
    const { pathname } = useLocation()
    const deleteButtonRef = React.useRef();

    useEffect(() => {
        if (pathname==='/saved-movies'){
            if (isMobile){
                deleteButtonRef.current.style.display = 'block'
            } else {
                deleteButtonRef.current.style.display = 'none'
            }
            }
    }, [isMobile])

    const handleMouseOver = () => {
        deleteButtonRef.current.style.display = 'block'
    }
    const handleMouseLeave = () => {
        deleteButtonRef.current.style.display = 'none'
    }
  
    function handleLikeClick() {
        onCardLike(card)
        }

    function handleDeleteClick() {
        onCardDelete(card._id);
        }
  
  const cardLikeButtonClassName = (`card__like-button button ${isLiked ? 'card__like-button_active': 'card__like-button_disabled'}`); 


  return (
    <li className='list-item movie-item'>
      {pathname==='/movies' && (<article className="card">
        <a className="card__link" href={card.trailerLink} target="_blank"><img src={`https://api.nomoreparties.co${card.image.url}`} alt={card.nameRU} className="card__image"/></a>
        <div className="card__info">
            <div className='card__data'>
                <h2 className="card__name">{i18n.language==='ru' ? card.nameRU : card.nameEN}</h2>
                <p className='card__length'>{
                    (() => {
                        if ((card.duration > 59) && ((card.duration % 60 !== 0))) {
                            return `${Math.floor(card.duration / 60)}${i18n.language==='ru' ? 'ч' : 'h'} ${card.duration % 60}${i18n.language==='ru' ? 'м' : 'm'}`
                        } else if ((card.duration % 60 === 0)) {
                            return `${Math.floor(card.duration / 60)}${i18n.language==='ru' ? 'ч' : 'h'}` 
                        } else {
                            return `${card.duration}${i18n.language==='ru' ? 'м' : 'm'}` 
                        }
                    })()
                    }
                </p>
            </div>
            <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
        </div>
      </article>)}

      {pathname==='/saved-movies' && (<article className="card" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        <a className="card__link" href={card.trailerLink} target="_blank"><img src={card.image} alt={card.nameRU} className="card__image"/></a>
        <div className="card__info">
            <div className='card__data'>
                <h2 className="card__name">{i18n.language==='ru' ? card.nameRU : card.nameEN}</h2>
                <p className='card__length'>{
                    (() => {
                        if ((card.duration > 59) && ((card.duration % 60 !== 0))) {
                            return `${Math.floor(card.duration / 60)}${i18n.language==='ru' ? 'ч' : 'h'} ${card.duration % 60}${i18n.language==='ru' ? 'м' : 'm'}`
                        } else if ((card.duration % 60 === 0)) {
                            return `${Math.floor(card.duration / 60)}${i18n.language==='ru' ? 'ч' : 'h'}` 
                        } else {
                            return `${card.duration}${i18n.language==='ru' ? 'м' : 'm'}` 
                        }
                    })()
                    }
                </p>
            </div>
            <button className="button card__delete-button" ref={deleteButtonRef} type="button"
                onClick={handleDeleteClick}
            ></button>
        </div>
      </article>)}
    </li>
    );
}

export default MoviesCard;
