import React, { useState, useEffect, useLayoutEffect } from 'react';
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
import { searchFindings } from '../../utils/constants';
import SearchHasError from '../SearchHasError/SearchHasError';
import SearchHasNoResults from '../SearchHasNoResults/SearchHasNoResults';
import useMedia from '../../hooks/useMedia';

function App() {

  const [isChecked, setFilterChecked] = useState(JSON.parse(localStorage.getItem('isChecked')))

  const [initialCards, setInitialCards] = useState([]);

  const [filteredCards, setFilteredCards] = useState(JSON.parse(localStorage.getItem('filteredCards')));
  
  const [visibleCards, setVisibleCards] = useState([]);

  const [filteredShorts, setFilteredShorts] = useState(filteredCards.filter((c) => c.duration <= 60));

  const [isMenuOpen, setMenuOpen] = useState(false);
  
  const [isRequired, setExtendedResult] = useState(false);

  const [isResultEmpty, setIsResultEmpty] = useState(false);

  const localWord = localStorage.getItem('inputValue');

  const [cardQuantity, setCardQuantity] = useState(12);
  const [ExtendedCardQuantity, setExtendedCardQuantity] = useState(3);
  
  const isDesktop = useMedia('(min-width: 931px)');
  const isTablet = useMedia('(min-width: 501px) and (max-width: 930px)');  
  const isMobile = useMedia('(min-width: 320px) and (max-width: 500px)');  
  const squaresGrid = document.querySelector('.movies__list');

  useEffect(() => {
    const handleResize = () => {
      // setWindowResizing(true)
      // console.log(windowResizing)
      let timeout;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // setWindowResizing(false);
        // setWindowWidth(window.innerWidth);
        console.log('windowResizing');
      }, 1000)
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    // useEffect(() => {
    //   console.log('windowWidth:', windowWidth)
    //   if (isDesktop) {
    //     setCardQuantity(2);
    //     console.log('cardQuantity:', cardQuantity)
    //   } else if (isTablet) {
    //     setCardQuantity(3);
    //     console.log('cardQuantity:', cardQuantity)
    //   } 

    // }, [cardQuantity, isDesktop])

    useEffect(() => {
      if (isMobile) {
        setCardQuantity(5);
        setExtendedCardQuantity(2)
        handleRendering();
        console.log('squaresGrid.style.gridTemplateColumns:', squaresGrid.style.gridTemplateColumns)
        squaresGrid.style.gridTemplateColumns = "1fr";
        console.log('cardQuantity:', cardQuantity)

      }
    }, [isMobile, cardQuantity, ExtendedCardQuantity])


    useEffect(() => {
      if (isTablet) {
        setCardQuantity(8);
        setExtendedCardQuantity(2)
        handleRendering()
        squaresGrid.style.gridTemplateColumns = "1fr 1fr";
      }
    }, [isTablet, cardQuantity, ExtendedCardQuantity])


    useEffect(() => {
      if (isDesktop) {
        setCardQuantity(12);
        setExtendedCardQuantity(3)
        handleRendering()
        squaresGrid.style.gridTemplateColumns = "1fr 1fr 1fr";
      }
    }, [isDesktop, cardQuantity, ExtendedCardQuantity])
    // useLayoutEffect(() => {
    //   if (isTablet) {
    //     setCardQuantity(3);
    //     console.log('cardQuantity:', cardQuantity)
    //   } 
    // }, [isTablet, window.innerWidth])

    // useEffect(() => {
    //   if (isMobile) {
    //     setCardQuantity(2);
    //     console.log('cardQuantity:', cardQuantity)
    //   } 
    // }, [isMobile, window.innerWidth])

    // useEffect(() => {
    //   setCardQuantity(cardQuantity);

    // }, [])

//   setWindowWidth(window.innerWidth)
  // let timout;
  // useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     setTimeout(() => {
  //       setWindowWidth();
  //     }, 2000);
  //   }
  //   );
  //   return () => {
  //     window.removeEventListener("resize", setWindowWidth)
  // }
    // return (window.removeEventListener('resize', () => {
        // clearTimeout(timout);
        // timout = setTimeout(setWindowWidth)}, 2000));
        // setTimeout(() => {
        //   setWindowWidth();
        // }, 2000);
    
      // }
// , [windowWidth])


  // function setWindowWidth () {
  //   if (window.innerWidth < 1000) {
  //     setCardQuantity(cardQuantity-1);
  //     console.log('window.innerWidth < 1000', window.innerWidth )
  //     console.log('cardQuantity:', cardQuantity)
  //   } else {
  //     setCardQuantity(cardQuantity-4);
  //     console.log('window.innerWidth > 1000', window.innerWidth)
  //     console.log('cardQuantity:', cardQuantity)
  //   }
  // }

  // switch (windowWidth) {
  //   case windowWidth=1000:
  //     setCardQuantity(3);
  //     console.log('window.innerWidth < 1000')
  //     console.log('cardQuantity:', cardQuantity)
  //     break;
  //   case windowWidth=700:
  //     setCardQuantity(6);
  //     console.log('window.innerWidth > 1000')
  //     console.log('cardQuantity:', cardQuantity)
  //     break;
  
  //   default:
  //     break;
  // }

  // const calculateCardQuantity

  // const setWindowWidth = (wi) => {
  //   calculateCardQuantity()
  //   console.log('setCardQuantity:', cardQuantity)
  //   if (window.innerWidth < 720) {
  //     setCardQuantity(2)
  //   } else {
  //     setCardQuantity(4)
  //   }
  // }
  // console.log('cardQuantity:',window.innerWidth, cardQuantity);





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

  function handleRendering() {
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

  function handleEmptyResults() {
    if ((filteredCards.length>0)||(localWord.length===0)) {
      searchFindings(false);
    } else {
      searchFindings(true);
      // setFilteredCards([])
      // setFilteredShorts([])
      // setVisibleCards([])
    }
  }

  // useEffect(() => {
  //   searchFindings(false)
  // }, [])




  useEffect(() => {
    handleEmptyResults()
    // console.log('handleEmptyResults:', handleEmptyResults)
    if (localWord) {
      setFilteredShorts(filteredShorts);
      setFilteredCards(filteredCards);
      handleRendering()
      handleEmptyResults()
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
      // setIsResultEmpty(false);
      // searchCompletion(false)
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
          handleEmptyResults()
          handleRendering();
          // console.log('isResultEmpty:', isResultEmpty)
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
        {/* {isDesktop && !isTablet && !isMobile <h1>Desktop</h1>}
        {isTablet && <h1>Tablet medium screen</h1>}
        {isMobile && <h1>Small screen</h1>} */}
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
            // isResultEmpty={isResultEmpty}
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
          <SearchHasNoResults
            // isResultEmpty={isResultEmpty}
          />
          <Footer></Footer>
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
