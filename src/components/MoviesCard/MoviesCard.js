import React from 'react';
import { useLocation} from 'react-router-dom';


function MoviesCard({card, onCardLike, onCardDelete, likedCards}) { 
// console.log('likedCards:', likedCards)
// console.log('card:', card)

    const isLiked = likedCards.some(i => i.movieId === card.id);
    // console.log('likedCardsisLiked:', card.id, isLiked)

    
//   const [isLiked, setCardLike] = useState(false);
    

//     useEffect(() => {
//         if (card.id)
//         tokenCheck();
//         }, []);


  const { pathname } = useLocation()
  const deleteButtonRef = React.useRef();
  
  const handleMouseOver = () => {
      deleteButtonRef.current.style.display = 'block'
  }
  const handleMouseLeave = () => {
      deleteButtonRef.current.style.display = 'none'
  }

  
  function handleLikeClick() {
    // setCardLike((isCardLiked) => !isCardLiked);
    onCardLike(card)
    }

function handleDeleteClick() {
    onCardDelete(card._id);
    }
  
  const cardLikeButtonClassName = (`card__like-button ${isLiked ? 'card__like-button_active': 'card__like-button_disabled'}`); 


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
        <a className="card__link" href={card.trailerLink} target="_blank"><img src={card.image} alt={card.nameRU} className="card__image"/></a>
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
            <button className="button card__delete-button" ref={deleteButtonRef} type="button"
                onClick={handleDeleteClick}
            ></button>
        </div>
      </article>)}
    </li>
    );
}

export default MoviesCard;
