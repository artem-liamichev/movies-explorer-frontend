import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute.js';

import './App.css';
import LandingHeader from '../LandingHeader/LandingHeader.js';
import Header from '../Header/Header.js';
import Promo from '../Promo/Promo.js';
import NavTab from '../NavTab/NavTab.js';
import AboutProject from '../AboutProject/AboutProject.js';
import Techs from '../Techs/Techs.js';
import AboutMe from '../AboutMe/AboutMe.js';
import Portfolio from '../Portfolio/Portfolio.js';
import Footer from '../Footer/Footer.js';
import SearchForm from '../SearchForm/SearchForm';
import SearchFormSavedMovie from '../SearchFormSavedMovie/SearchFormSavedMovie';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import FilterCheckboxSavedMovies from '../FilterCheckboxSavedMovies/FilterCheckboxSavedMovies'
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import SearchNotValid from '../SearchNotValid/SearchNotValid';
import { api } from '../../utils/MoviesApi';
import { renderLoading } from '../../utils/constants';
import { searchResult } from '../../utils/constants';
import { searchCompletion } from '../../utils/constants';
import { searchFindings } from '../../utils/constants';
import SearchHasError from '../SearchHasError/SearchHasError';
import SearchHasNoResults from '../SearchHasNoResults/SearchHasNoResults';
import useMedia from '../../hooks/useMedia';

import { CurrenUserContext } from '../../contexts/CurrentUserContext.js';
import { mainApi } from '../../utils/MainApi';

function App() {

  const { pathname } = useLocation()
  const [isChecked, setFilterChecked] = useState(JSON.parse(localStorage.getItem('isChecked')))
  const [isSavedMovieChecked, setSavedMovieFilterChecked] = useState(false);
  const [filteredCards, setFilteredCards] = useState(JSON.parse(localStorage.getItem('filteredCards'))||[]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [filteredShorts, setFilteredShorts] = useState(filteredCards.filter((c) => c.duration <= 60));
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isRequired, setExtendedResult] = useState(false);
  const localWord = localStorage.getItem('inputValue');
  const [cardQuantity, setCardQuantity] = useState(12);
  const [ExtendedCardQuantity, setExtendedCardQuantity] = useState(3);
  const [cards, setCards] = useState([]);
  const [likedCards, setLikedCards] = useState([]);
  const isDesktop = useMedia('(min-width: 931px)');
  const isTablet = useMedia('(min-width: 501px) and (max-width: 930px)');  
  const isMobile = useMedia('(min-width: 320px) and (max-width: 500px)');  
  const squaresGrid = document.querySelector('.movies__list');
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isUpdateUserFailed, setIsUpdateUserFailed] = useState(false);
  const [isUpdateUserCompleted, setIsUpdateUserCompleted] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [savedMoviesFilterText, setSavedMoviesFilterText] = useState('');
  const [savedMoviesFilteredCards, setSavedMoviesFilteredCards] = useState(likedCards);
  const [savedMoviesVisibleCards, setSavedMoviesVisibleCards] = useState([]);
  const [filteredSavedMoviesShorts, setFilteredSavedMoviesShorts] = useState([]);
  const jwt = localStorage.getItem('jwt');

  const tokenCheck = () => {  
    if (jwt) {
      mainApi
      .getProfile(jwt)
      .then((res) => {
        if (res._id) {
          setUserEmail(res.email);
          setUserName(res.name);
          setLoggedIn(true);
        }})
      .catch((err) => {
        console.log(err);
      }) }
      api
        .getInitialCards()
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
        });    }

  useEffect(() => {
    tokenCheck();
  }, []);

  const onLogin = (data) => {
    return mainApi
      .authorize(data)
      .then((data) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        history.push('/movies');
        return data;
      })
      .catch((err) => {
        console.log(err);
      }) 
    }

  const onRegister = (data) => {
    mainApi
      .register(data)
      .then(() => {
        console.log('registerdata:', data)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        onLogin(data);
      })
    }

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
        });
      mainApi
        .getProfile(jwt)
        .then((profileInfo) => {
          setCurrentUser(profileInfo);
        })
        .catch((err) => {
          console.log(err);
        });
      mainApi
        .getLikedCards(jwt)
        .then((likedCards) => {
          setLikedCards(likedCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn])

    useEffect(() => {
      if (pathname === '/movies' || pathname === '/saved-movies') {
        if (isMobile) {
          setCardQuantity(5);
          setExtendedCardQuantity(2)
          squaresGrid.style.gridTemplateColumns = "1fr";
        }
        }
    }, [isMobile, cardQuantity, ExtendedCardQuantity])

    useEffect(() => {
      if (pathname === '/movies' || pathname === '/saved-movies') {
        if (isTablet) {
          setCardQuantity(8);
          setExtendedCardQuantity(2)
          squaresGrid.style.gridTemplateColumns = "1fr 1fr";
        }
        }
    }, [isTablet, cardQuantity, ExtendedCardQuantity])

    useEffect(() => {
      if (pathname === '/movies' || pathname === '/saved-movies') {
        if (isDesktop) {
          setCardQuantity(12);
          setExtendedCardQuantity(3)
          squaresGrid.style.gridTemplateColumns = "1fr 1fr 1fr";
        }
        }
    }, [isDesktop, cardQuantity, ExtendedCardQuantity])
  

  function handleExtendClick() {
    if (isChecked) {
      if (visibleCards.length > filteredShorts.length-(ExtendedCardQuantity+1)) {
        setExtendedResult(false)
      }
      setVisibleCards(filteredShorts.slice(0, visibleCards.length+ExtendedCardQuantity));
    } else {
      if (visibleCards.length > filteredCards.length-(ExtendedCardQuantity+1)) {
        setExtendedResult(false)
      }
      setVisibleCards(filteredCards.slice(0, visibleCards.length+ExtendedCardQuantity));
      }
  }

  useEffect(() => {
    handleRendering() 
  }, [filteredCards, isChecked]);

  useEffect(() => {
    handleSavedMoviesRendering() 
  }, [isSavedMovieChecked, savedMoviesFilteredCards]);

  function handleRendering() {
    const filteredShorts = filteredCards.filter((c) => c.duration <= 60);
    setFilteredShorts(filteredShorts);
    if (!isChecked) {
      if (filteredCards.length <= cardQuantity) {
        setVisibleCards(filteredCards)
        setExtendedResult(false)
      } else {
        setExtendedResult(true)
        setVisibleCards(filteredCards.slice(0,cardQuantity));
        };  
    }
     else {
      if (filteredShorts.length <= cardQuantity) {
        setVisibleCards(filteredShorts);
        setExtendedResult(false)
      } else {
        setExtendedResult(true)
        setVisibleCards(filteredShorts.slice(0,cardQuantity));
      }      
    }
  }

  function handleCardLike(card) {
    const isLiked = likedCards.some(i => i.movieId === card.id);
    const savedCard = likedCards.filter((c) => c.movieId === card.id);
    if (isLiked) {
      const movieId = savedCard[0]._id;
      mainApi.deleteCard(movieId)
      .then(() => {
        const newCards = likedCards.filter((c) => c._id !== movieId);
        setLikedCards(newCards);
      })
      .catch((err) => {
        console.log(err);
    })
    } else {
      mainApi.addCard(card) 
        .then((card)=> {
          setLikedCards([...likedCards, card]); 
        })
        .catch((err) => {
          console.log(err);
        })
}
}

  function handleCardDelete(movieId) {
    mainApi.deleteCard(movieId)
    .then(() => {
      const newCards = likedCards.filter((c) => c._id !== movieId);
      setLikedCards(newCards);
    })
    .catch((err) => {
      console.log(err);
  }) }

  useEffect(() => {
    if (pathname === '/movies' || pathname === '/saved-movies') {
      if (localWord) {
        setFilteredShorts(filteredShorts);
        setFilteredCards(filteredCards);
      }
      else {
        setFilteredCards([])
        setFilteredShorts([])
        setLikedCards([])
        setVisibleCards([])
      }  
    }
  }, [isChecked, localWord])

  function handleUpdateUser(profileInfo) {
    mainApi.updateUserInfo(profileInfo) 
      .then((profileInfo)=> {
        setIsUpdateUserCompleted(true)
        setTimeout(() => {
          setIsUpdateUserCompleted(false)
        }, 4000);
        setCurrentUser(profileInfo);
      })
      .catch((err) => {
        console.log(err);
        setIsUpdateUserFailed(true)
        setTimeout(() => {
          setIsUpdateUserFailed(false)
        }, 4000);
      }) }


  function handleMenuClick() {
    setMenuOpen(true);
  }

  function closeMenuClick() {
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!isSavedMovieChecked) {
      setSavedMoviesVisibleCards(likedCards)
    } 
    else if (!savedMoviesFilterText) {
      const filteredSavedMoviesShorts = likedCards.filter((c) => c.duration <= 60);
      setSavedMoviesVisibleCards(filteredSavedMoviesShorts)
    }
  }, [(pathname === '/saved-movies'), likedCards, isSavedMovieChecked])

  function handleSavedMoviesSearch(savedMoviesFilterText) {
    if (savedMoviesFilterText) {
      setSavedMoviesFilterText(savedMoviesFilterText)
      searchResult(true);
        if (likedCards) {
          const savedMoviesFilteredCards = likedCards.filter((card) => card.nameRU.toLowerCase().includes(savedMoviesFilterText)||card.nameEN.toLowerCase().includes(savedMoviesFilterText))
          setSavedMoviesFilteredCards(savedMoviesFilteredCards);
          setSavedMoviesVisibleCards(savedMoviesFilteredCards)
          if ((savedMoviesFilteredCards.length>0)||(savedMoviesFilterText.length===0)) {
            searchFindings(false);
          } else {
            searchFindings(true);
          }
        } 
      } 
    else {
      searchResult(false)
    }
  }

  function handleSearch(filterText) {
    if (filterText) {
      searchResult(true);
        if (cards) {
          const filteredCards = cards.filter((card) => card.nameRU.toLowerCase().includes(filterText)||card.nameEN.toLowerCase().includes(filterText))
          localStorage.setItem('filteredCards', JSON.stringify(filteredCards));
          setFilteredCards(filteredCards);
          if ((filteredCards.length>0)||(localWord.length===0)) {
            searchFindings(false);
          } else {
            searchFindings(true);
          }
        } else {
          renderLoading(true);
          api
          .getInitialCards()
          .then((initialCards) => {
            const filteredCards = initialCards.filter((card) => card.nameRU.toLowerCase().includes(filterText)||card.nameEN.toLowerCase().includes(filterText))
            localStorage.setItem('filteredCards', JSON.stringify(filteredCards));
            setFilteredCards(filteredCards);
            if ((filteredCards.length>0)||(localWord.length===0)) {
              searchFindings(false);
            } else {
              searchFindings(true);
            }
          })
          .catch((err) => {
            console.log(err);
            searchCompletion(false)
          })
          .finally(()=>{
            setTimeout(()=>{
              renderLoading(false);
            }, 200);
          }
            )
        }
      } 
    else {
      searchResult(false)
    }
}

const onLogout = () => {
  // likedCards.forEach((card) => {
  //   const movieId = card._id;
  //   mainApi.deleteCard(movieId)
  // });
  setCards([]);
  setFilteredCards([])
  setLoggedIn(false);
  localStorage.removeItem('jwt')
  localStorage.removeItem('filteredCards')
  localStorage.removeItem('isChecked')
  localStorage.removeItem('inputValue')
  history.push('/');
}

function handleSavedMoviesRendering() {
  const filteredSavedMoviesShorts = savedMoviesFilteredCards.filter((c) => c.duration <= 60);
  setFilteredSavedMoviesShorts(filteredSavedMoviesShorts);
  if (isSavedMovieChecked) {
    setSavedMoviesVisibleCards(filteredSavedMoviesShorts);
  }
}

  return (

    <CurrenUserContext.Provider value={currentUser}>
    
    <div className="page__container">
      <Switch>
        <Route exact path="/">
          <main className='main'>
          {!isLoggedIn && <LandingHeader/>}
          {isLoggedIn && <Header 
            isOpen={isMenuOpen}
            onMenuClick={handleMenuClick}
            onClose={closeMenuClick}
            />}
            <Promo/>
            <NavTab/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Portfolio/>
          <Footer/>
          </main> 
        </Route>
        <ProtectedRoute 
          path="/movies" isLoggedIn={isLoggedIn}>
          <Header 
            isOpen={isMenuOpen}
            onMenuClick={handleMenuClick}
            onClose={closeMenuClick}
            />          
          <SearchForm
            onSearchClick={handleSearch}>
            <FilterCheckbox
              onFilterClick={setFilterChecked}
              handle/>
          </SearchForm>
          <Preloader/>
          <MoviesCardList
            onExtendClick={handleExtendClick}
            isRequired={isRequired}
          >
            {visibleCards.map((card, index)=>{
              return (<MoviesCard
              card={card} key={index}
              onCardLike = {handleCardLike} 
              likedCards={likedCards}
              />)
            })}
          </MoviesCardList>
          <SearchNotValid/>
          <SearchHasError/>
          <SearchHasNoResults/>
          <Footer/>
        </ProtectedRoute>
        <ProtectedRoute path="/saved-movies" isLoggedIn={isLoggedIn}>
          <Header 
            isOpen={isMenuOpen}
            onMenuClick={handleMenuClick}
            onClose={closeMenuClick}/>  
          <SearchFormSavedMovie
            onSavedMoviesSearchClick={handleSavedMoviesSearch}
          >
            <FilterCheckboxSavedMovies
              onFilterClick={setSavedMovieFilterChecked}
            />
          </SearchFormSavedMovie>
          <Preloader/>
          <MoviesCardList
            onExtendClick={handleExtendClick}>
            {savedMoviesVisibleCards.map((card, index)=>{
                return (<MoviesCard
                card={card} key={index}
                onCardDelete ={handleCardDelete}
                likedCards={savedMoviesVisibleCards}
                />)
              })}
          </MoviesCardList>
          <SearchNotValid/>
          <SearchHasError/>
          <SearchHasNoResults/>
          <Footer/>
        </ProtectedRoute>
        <ProtectedRoute 
          path="/profile" 
          isLoggedIn={isLoggedIn}>
          <Header 
            isOpen={isMenuOpen}
            onMenuClick={handleMenuClick}
            onClose={closeMenuClick}
            />
            
          <Profile
            userEmail={userEmail}
            userName={userName}
            onLogout={onLogout}
            onUpdateUser={handleUpdateUser}
            isUpdateUserFailed={isUpdateUserFailed}
            isUpdateUserCompleted={isUpdateUserCompleted}
            />
        </ProtectedRoute>
        <Route path="/signup">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signup"/>}
            <Register onRegister={onRegister}/>
        </Route>
        <Route path="/signin">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin"/>}
            <Login onLogin={onLogin}/>
        </Route>
        <Route path='*'>
            <PageNotFound />
          </Route>
      </Switch>
    </div>
    </CurrenUserContext.Provider>
  );
}

export default App;
