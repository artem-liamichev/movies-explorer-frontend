import React, { useState, useEffect, useMemo } from 'react';
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
import { Route, Switch } from 'react-router-dom';
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
import SearchHasError from '../SearchHasError/SearchHasError';

function App() {

  const [isChecked, setFilterChecked] = useState(JSON.parse(localStorage.getItem('isChecked')))

  const [initialCards, setInitialCards] = useState([]);

  const [filteredCards, setFilteredCards] = useState(JSON.parse(localStorage.getItem('filteredCards')));
  
  const [visibleCards, setVisibleCards] = useState([]);

  const [filteredShorts, setFilteredShorts] = useState(filteredCards.filter((c) => c.duration <= 60));

  const [isMenuOpen, setMenuOpen] = useState(false);
  
  const [isRequired, setExtendedResult] = useState(false);

  const localWord = localStorage.getItem('inputValue')

  function handleExtendClick() {
    if (isChecked) {
      if (visibleCards.length > filteredShorts.length-4) {
        setExtendedResult(false)
      }
      setVisibleCards(filteredShorts.slice(0, visibleCards.length+3));
    } else {
      if (visibleCards.length > filteredCards.length-4) {
        setExtendedResult(false)
      }
      setVisibleCards(filteredCards.slice(0, visibleCards.length+3));
      }
  }

  function handleRendering() {
    if (!isChecked) {
      if (filteredCards.length <= 6) {
        setVisibleCards(filteredCards)
        setExtendedResult(false)
      } else {
        setExtendedResult(true)
        setVisibleCards(filteredCards.slice(0,6));
        };  
    }
     else {
      if (filteredShorts.length <= 6) {
        setVisibleCards(filteredShorts);
        setExtendedResult(false)
      } else {
        setExtendedResult(true)
        setVisibleCards(filteredShorts.slice(0,6));
      }      
    }
  }

  useEffect(() => {
    if (localWord) {
      setFilteredShorts(filteredShorts);
      setFilteredCards(filteredCards);
      handleRendering()
    }
    else {
      setFilteredCards([])
      setFilteredShorts([])
      setVisibleCards([])
    }
  }, [isChecked, localWord])

  function handleMenuClick() {
    setMenuOpen(true);
  }

  function closeMenuClick() {
    setMenuOpen(false);
  }

  function handleSearch(filterText) {
    if (filterText) {
      searchResult(true);
      renderLoading(true);
      api
        .getInitialCards()
        .then((initialCards) => {
          setInitialCards(initialCards);
          const filteredCards = initialCards.filter((card) => card.nameRU.toLowerCase().includes(filterText)||card.nameEN.toLowerCase().includes(filterText))
          setFilteredCards(filteredCards);
          localStorage.setItem('filteredCards', JSON.stringify(filteredCards));
          const filteredShorts = filteredCards.filter((c) => c.duration <= 60);
          setFilteredShorts(filteredShorts);
          handleRendering()
        })
        .catch((err) => {
          console.log(err);
          searchCompletion(false)
        })
        .finally(()=>{
          setTimeout(()=>{
            renderLoading(false);
          }, 200)})
    } else {
      searchResult(false)
    }
}

  return (
    <div className="page__container">
      <Switch>
        <Route exact path="/">
          <main className='main'>
          <LandingHeader/>
            <Promo/>
            <NavTab/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Portfolio/>
          <Footer/>
          </main> 
        </Route>
        <Route path="/movies">
          <Header 
            isOpen={isMenuOpen}
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
            isRequired={isRequired}
          >
            {visibleCards.map((card, index)=>{
              return (<MoviesCard
              card={card} key={index}/>)
            })}
          </MoviesCardList>
          <SearchNotValid/>
          <SearchHasError/>
          <Footer/>
        </Route>
        <Route path="/saved-movies">
          <Header 
            isOpen={isMenuOpen}
            onMenuClick={handleMenuClick}
            onClose={closeMenuClick}/>  
          <SearchForm
            onSearchClick={handleSearch}
          >
            <FilterCheckbox/>
          </SearchForm>
          <MoviesCardList>
            {savedCards.map((card, index)=>{
                return (<MoviesCard
                card={card} key={index}/>)
              })}
          </MoviesCardList>
          <Footer/>
        </Route>
        <Route path="/profile">
          <Header 
            isOpen={isMenuOpen}
            onMenuClick={handleMenuClick}
            onClose={closeMenuClick}/>
          <Profile/>
        </Route>
        <Route path="/signup">
          <Register/>
        </Route>
        <Route path="/signin">
          <Login/>
        </Route>
        <Route path='*'>
            <PageNotFound />
          </Route>
      </Switch>
    </div>
  );
}

export default App;
