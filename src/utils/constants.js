
export const config = {
  preloader: '.preloader',
  notValid: '.not-valid',
  searchBlock: '.movies',
  extendBlock: '.movies__more-button',
  hasError: '.has-error'
}

export function renderLoading(isLoading) {
    if (isLoading) {
    document.querySelector(config.preloader).style.display = 'flex';
    document.querySelector(config.notValid).style.display = 'none';
    document.querySelector(config.searchBlock).style.display = 'none';
  } else {
    document.querySelector(config.preloader).style.display = 'none';
    document.querySelector(config.searchBlock).style.display = 'flex';

  }
}

export function searchResult(isValid) {
  if (isValid) {
    document.querySelector(config.notValid).style.display = 'none';
    document.querySelector(config.searchBlock).style.display = 'flex';
  } else {
    document.querySelector(config.searchBlock).style.display = 'none';
    document.querySelector(config.notValid).style.display = 'flex';
  }
}

export function searchCompletion(isCorrect) {
  if (isCorrect) {
    document.querySelector(config.hasError).style.display = 'none';
    document.querySelector(config.searchBlock).style.display = 'flex';
  } else {
    document.querySelector(config.searchBlock).style.display = 'none';
    document.querySelector(config.hasError).style.display = 'flex';
  }
}