
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