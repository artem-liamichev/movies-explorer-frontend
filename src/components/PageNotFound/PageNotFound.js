import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound () {
  return (
    <div className="not-found">
      <h3 className="not-found__title">404</h3>
      <p className="not-found__subline">Страница не найдена</p>
      <a className="not-found__link link" href="/" target="_blank">Назад</a>
    </div>
  )
}

export default PageNotFound;