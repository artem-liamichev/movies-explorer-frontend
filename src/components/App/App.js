import React, { useState } from 'react';
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
import {initialCards} from '../../utils/initialCards';
import {savedCards} from '../../utils/savedCards';


function App() {

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isRequired, setExtendedResult] = useState(false);
  
  function handleExtendClick() {
    if (isChecked) {
      console.log('visibleCards:', visibleCards)
      console.log('filteredShorts:', filteredShorts)
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

  useEffect(() => {
    // setFilterChecked(localStorage.getItem('isChecked'))
    console.log('useEffectisChecked:', isChecked)
    if (isChecked) {
        if (filteredShorts.length <= 6) {
          setVisibleCards(filteredShorts);
          setExtendedResult(false)
        } else {
          setExtendedResult(true)
          setVisibleCards(filteredShorts.slice(0,6));
        }
      } else 
        if (filteredCards.length <= 6) {
            setVisibleCards(filteredCards)
            setExtendedResult(false)
          } else {
            setExtendedResult(true)
            setVisibleCards(filteredCards.slice(0,6));
            };
  }, [isChecked])

  useEffect(() => {
  
  function handleMenuClick () {
    setMenuOpen(true);
  }

  function closeMenuClick () {
    setMenuOpen(false);
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
          <SearchForm>
            <FilterCheckbox/>
          </SearchForm>
          {/* <Preloader/> */}
          <MoviesCardList>
            {initialCards.map((card, index)=>{
              return (<MoviesCard
              card={card} key={index}/>)
            })}
          </MoviesCardList>
          <Footer/>
        </Route>
        <Route path="/saved-movies">
          <Header 
            isOpen={isMenuOpen}
            onMenuClick={handleMenuClick}
            onClose={closeMenuClick}/>  
          <SearchForm>
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
