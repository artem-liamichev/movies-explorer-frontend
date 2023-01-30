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
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import SearchNotValid from '../SearchNotValid/SearchNotValid';
import {savedCards} from '../../utils/savedCards';
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

  const [initialCards, setInitialCards] = useState([]);

  const [testCards, setTestCards] = useState([]);


  const [filteredCards, setFilteredCards] = useState(JSON.parse(localStorage.getItem('filteredCards')));
  
  const [visibleCards, setVisibleCards] = useState([]);

  const [filteredShorts, setFilteredShorts] = useState(filteredCards.filter((c) => c.duration <= 60));

  const [isMenuOpen, setMenuOpen] = useState(false);
  
  const [isRequired, setExtendedResult] = useState(false);

  const [isResultEmpty, setIsResultEmpty] = useState(false);

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
  console.log('isLoggedIn:', isLoggedIn)

  const history = useHistory();

  const jwt = localStorage.getItem('jwt');

  const tokenCheck = () => {

    
    if (jwt) {
      mainApi
      .getProfile(jwt)
      .then((res) => {
        console.log('res:', res)
        if (res._id) {
          setUserEmail(res.email);
          setUserName(res.name);
          setLoggedIn(true);
          // history.push("/movies")
        }})
      .catch((err) => {
        console.log(err);
      }) }
    }

  useEffect(() => {
    tokenCheck();
  }, []);

  const onLogin = (data) => {
    console.log('onLogindata:', data)
    return mainApi
      .authorize(data)
      .then((data) => {
        console.log('authorizedata:', data)
        setLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        history.push('/movies');
        return data;
      })
      .catch((err) => {
        console.log(err);
        // setRegisterFailPopup(true)
      }) 
    }

  const onRegister = (data) => {
    // console.log('onRegisterdata:', data)
    return mainApi
      .register(data)
      .then(() => {
        console.log('mainApidata:', data)
        // setRegisterSuccessPopupOpen(true)
        history.push('/signin');
      })
      .catch((err) => {
        console.log(err);
        // setRegisterFailPopup(true)
      }) }

  const onLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt')
    history.push('/');
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
      if (isMobile) {
        setCardQuantity(5);
        setExtendedCardQuantity(2)
        // handleRendering();
        console.log('squaresGrid.style.gridTemplateColumns:', squaresGrid.style.gridTemplateColumns)
        squaresGrid.style.gridTemplateColumns = "1fr";
        console.log('cardQuantity:', cardQuantity)

      }
    }, [isMobile, cardQuantity, ExtendedCardQuantity])

    useEffect(() => {
      if (isTablet) {
        setCardQuantity(8);
        setExtendedCardQuantity(2)
        // handleRendering()
        squaresGrid.style.gridTemplateColumns = "1fr 1fr";
      }
    }, [isTablet, cardQuantity, ExtendedCardQuantity])

    useEffect(() => {
      if (isDesktop) {
        setCardQuantity(12);
        setExtendedCardQuantity(3)
        // handleRendering()
        squaresGrid.style.gridTemplateColumns = "1fr 1fr 1fr";
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
    // setFilteredCards(filteredCards)
    console.log('REPA useEffectfilteredCards:', filteredCards)
    handleRendering() 
  }, [filteredCards, isChecked]);


  function handleRendering() {
    const filteredShorts = filteredCards.filter((c) => c.duration <= 60);
    setFilteredShorts(filteredShorts);
    console.log('REPA handleSearch-filteredShorts:', filteredShorts)

    console.log('REPA handleRendering-filteredCards:', filteredCards)
    // setFilteredCards(JSON.parse(localStorage.getItem('filteredCards')));
    if (!isChecked) {
            // console.log('isChecked:', isChecked)
      if (filteredCards.length <= cardQuantity) {
        setVisibleCards(filteredCards)
        // console.log('visibleCards:', visibleCards)
        setExtendedResult(false)
      } else {
        setExtendedResult(true)
        setVisibleCards(filteredCards.slice(0,cardQuantity));
        };  
    }
     else {
      if (filteredShorts.length <= cardQuantity) {
        // console.log('filteredShorts:', filteredShorts)
        setVisibleCards(filteredShorts);
        setExtendedResult(false)
      } else {
        setExtendedResult(true)
        setVisibleCards(filteredShorts.slice(0,cardQuantity));
      }      
    }
  }

  function handleEmptyResults() {
    console.log('REPA handleEmptyResults:', handleEmptyResults)
    if ((filteredCards.length>0)||(localWord.length===0)) {
      searchFindings(false);
    } else {
      searchFindings(true);
    }
  }

  // function handleCardLike(newCard) {
  //   const card = newCard.card
  //   console.log('likedCards:', likedCards)
  //   mainApi.addCard(card) 
  //     .then((card)=> {
  //       setLikedCards([...likedCards, card]); 
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }

  function handleCardLike(card) {
    console.log('card:', card)
    const isLiked = likedCards.some(i => i.movieId === card.id);
    // const movieId = likedCards.filter((c))

    const savedCard = likedCards.filter((c) => c.movieId === card.id);
    console.log('Testcard:', savedCard)
    // console.log('Testcard._id:', Testcard[0]._id)

    // console.log('movieId:', movieId)
    // console.log('likedcardmovieId:', likedCards[0].movieId)
    console.log('isLiked:', isLiked)
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
      // const card = newCard.card
      // console.log('likedCards:', likedCards)
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
    console.log('handleCardDeletemovieId:', movieId)
    mainApi.deleteCard(movieId)
    .then(() => {
      const newCards = likedCards.filter((c) => c._id !== movieId);
      setLikedCards(newCards);
    })
    .catch((err) => {
      console.log(err);
  }) }


  useEffect(() => {
    // console.log('handleEmptyResults:', searchFindings);
    if (pathname === '/movies' || pathname === '/saved-movies') {
      // handleEmptyResults();
      if (localWord) {
        setFilteredShorts(filteredShorts);
        setFilteredCards(filteredCards);
        // 
        // handleEmptyResults();
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


  function handleSavedMoviesClick() {
    setLikedCards()
    }


  console.log('REPA searchResult:', searchResult)
  
  // console.log('REPA filteredCards:', filteredCards)
  function handleSearch(filterText) {
    if (filterText) {
      searchResult(true);
      renderLoading(true);
        api
        .getInitialCards()
        .then((initialCards) => {
          // setInitialCards(initialCards);
          const filteredCards = initialCards.filter((card) => card.nameRU.toLowerCase().includes(filterText)||card.nameEN.toLowerCase().includes(filterText))
          localStorage.setItem('filteredCards', JSON.stringify(filteredCards));
          console.log('REPA handleSearch-filteredCards:', filteredCards)
          setFilteredCards(filteredCards);
          if ((filteredCards.length>0)||(localWord.length===0)) {
            searchFindings(false);
          } else {
            searchFindings(true);
          }
      
          // const filteredShorts = filteredCards.filter((c) => c.duration <= 60);
          // setFilteredShorts(filteredShorts);
          // console.log('REPA handleSearch-filteredShorts:', filteredShorts)
          // setTestCards([1,2,3]);          
          // handleEmptyResults()
          // handleRendering();
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
    else {
      searchResult(false)
    }

    // function handleRendering() {

    //   console.log('rendiring befor super - filteredCards:', filteredCards)
    //   const superCards = JSON.parse(localStorage.getItem('filteredCards'))
    //   setFilteredCards(superCards);
    //   setFilteredCards(filteredCards => ([...filteredCards, ...superCards]));

    //   console.log('superCards:', superCards)
    //   console.log('handleRendering-filteredCards:', filteredCards)
    //   // setFilteredCards(JSON.parse(localStorage.getItem('filteredCards')));
    //   if (!isChecked) {
    //           // console.log('isChecked:', isChecked)
    //     if (filteredCards.length <= cardQuantity) {
    //       setVisibleCards(filteredCards)
    //       // console.log('visibleCards:', visibleCards)
    //       setExtendedResult(false)
    //     } else {
    //       setExtendedResult(true)
    //       setVisibleCards(filteredCards.slice(0,cardQuantity));
    //       };  
    //   }
    //    else {
    //     if (filteredShorts.length <= cardQuantity) {
    //       // console.log('filteredShorts:', filteredShorts)
    //       setVisibleCards(filteredShorts);
    //       setExtendedResult(false)
    //     } else {
    //       setExtendedResult(true)
    //       setVisibleCards(filteredShorts.slice(0,cardQuantity));
    //     }      
    //   }
    // }
  

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
            onClose={closeMenuClick}/>}
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
            onClose={closeMenuClick}/>          
          <SearchForm
            onSearchClick={handleSearch}>
            <FilterCheckbox
              onFilterClick={setFilterChecked}
              handle/>
          </SearchForm>
          <Preloader/>
          <MoviesCardList
            isResultEmpty={isResultEmpty}
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
        <ProtectedRoute path="/saved-movies">
          <Header 
            isOpen={isMenuOpen}
            onSavedMoviesClick={handleSavedMoviesClick}
            onMenuClick={handleMenuClick}
            onClose={closeMenuClick}/>  
          <SearchForm
            onSearchClick={handleSearch}
          >
            <FilterCheckbox
              onFilterClick={setFilterChecked}
            />
          </SearchForm>
          <Preloader/>
          <MoviesCardList
            onExtendClick={handleExtendClick}
            isRequired={isRequired}>
            {likedCards.map((card, index)=>{
                return (<MoviesCard
                card={card} key={index}
                onCardDelete ={handleCardDelete}
                likedCards={likedCards}
                />)
              })}
          </MoviesCardList>
          <SearchNotValid/>
          <SearchHasError/>
          <SearchHasNoResults
            isResultEmpty={isResultEmpty}
            />
          <Footer/>
        </ProtectedRoute>
        <ProtectedRoute 
          path="/profile" 
          isLoggedIn={isLoggedIn}>
          <Header 
            isOpen={isMenuOpen}
            onMenuClick={handleMenuClick}
            onClose={closeMenuClick}/>
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
          <Register onRegister={onRegister}/>
        </Route>
        <Route path="/signin">
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
