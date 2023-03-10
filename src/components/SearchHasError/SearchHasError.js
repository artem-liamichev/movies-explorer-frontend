import React from 'react';

function SearchHasError () {
  return (
    <div className="has-error">
      <h3 className="has-error__title ">Во время запроса произошла ошибка. Возможно, проблема с 
      соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</h3>
    </div>
  )
}

export default SearchHasError;