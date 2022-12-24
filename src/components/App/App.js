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
          <LandingHeader/>
          <div className='main'>
            <Promo/>
            <NavTab/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Portfolio/>
          </div>
          <Footer/>
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
