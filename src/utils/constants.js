export const ShortMovieLength = 60;
export const CardQuantityMobile = 5;
export const CardQuantityTablet = 8;
export const CardQuantityDesktop = 12;
export const ExtentedCardQuantityMobile = 2;
export const ExtentedCardQuantityTablet = 2;
export const ExtentedCardQuantityDesktop = 3;
export const DesktopSize = '(min-width: 931px)';
export const TabletSize = '(min-width: 501px) and (max-width: 930px)';  
export const MobileSize = '(min-width: 320px) and (max-width: 500px)';  

export const config = {
  preloader: '.preloader',
  notValid: '.not-valid',
  moviesBlock: '.movies',
  extendBlock: '.movies__more-button',
  hasError: '.has-error',
  hasNoResults: '.has-no-results'
}

export function renderLoading(isLoading) {
    if (isLoading) {
    document.querySelector(config.preloader).style.display = 'flex';
    document.querySelector(config.notValid).style.display = 'none';
    document.querySelector(config.hasNoResults).style.display = 'none';
    document.querySelector(config.moviesBlock).style.display = 'none';
    document.querySelector(config.hasError).style.display = 'none';
  } else {
    document.querySelector(config.preloader).style.display = 'none';
  } 
}

export function searchResult(isValid) {
  if (isValid) {
    document.querySelector(config.notValid).style.display = 'none';
  } else {
    document.querySelector(config.moviesBlock).style.display = 'none';
    document.querySelector(config.hasError).style.display = 'none';
    document.querySelector(config.notValid).style.display = 'flex';
    document.querySelector(config.hasNoResults).style.display = 'none';
  }
}

export function searchCompletion(isCorrect) {
  if (isCorrect) {
    document.querySelector(config.hasError).style.display = 'none';
  } else {
    document.querySelector(config.hasError).style.display = 'flex';
  }
}

export function searchFindings(isEmpty) {
  if (isEmpty) {
    document.querySelector(config.moviesBlock).style.display = 'none';
    document.querySelector(config.hasNoResults).style.display = 'flex';
  } else {
    document.querySelector(config.hasNoResults).style.display = 'none';
    document.querySelector(config.moviesBlock).style.display = 'flex';
  }
}