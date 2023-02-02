class Api {
    constructor(url) {
      this._url = url;
      this._headers = {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      }
    }
  
    _getToken = () => localStorage.getItem('jwt');
  
    _checkServerResponse(res){
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Возникла ошибка')
    }
  
    getInitialCards() {
      return fetch(`${this._url}`, {
        headers: {
        ...this._headers,
        'Authorization': `Bearer ${this._getToken()}`,
      }
      })
        .then(this._checkServerResponse)
    }
   }
  
   export const api = new Api('https://api.nomoreparties.co/beatfilm-movies')
  