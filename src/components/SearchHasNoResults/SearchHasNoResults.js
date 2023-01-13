import React from 'react';

function SearchHasNoResults ({isResultEmpty}) {
  return (
    <div className="has-no-results"
    style={{display: isResultEmpty ? 'flex' : 'none' }} 
    >
      <h3 className="has-no-results__title">Ничего не найдено</h3>
    </div>
  )
}

export default SearchHasNoResults;