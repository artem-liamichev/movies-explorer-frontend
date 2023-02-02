class MainApi {
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
    
    register({ name, email, password  }) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                ...this._headers,
                },
            body: JSON.stringify({ name, email, password })
        })
        .then(this._checkServerResponse)
    };

    authorize(data) {
        const body = {
            email: data.email,
            password: data.password,
    }
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                ...this._headers,
                },          
            body: JSON.stringify(body)
        })
        .then(this._checkServerResponse)
        };
    
    getProfile(token) {
        return fetch(`${this._url}/users/me`, {
            headers: {
                ...this._headers,
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(this._checkServerResponse)
        }
    updateUserInfo(data) {
        const body = {
          email: data.email,
          name: data.name
        }
        return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: {
            ...this._headers,
            'Authorization': `Bearer ${this._getToken()}`,
          },
          body: JSON.stringify(body)
    })
        .then(this._checkServerResponse)
      }

      addCard(data) {
        console.log('data:', data.image.formats.thumbnail.url)
        const body = {
            country: data.country,
            movieId: data.id,
            nameRU: data.nameRU,
            nameEN: data.nameEN,
            director: data.director,        
            duration: data.duration,
            year: data.year,
            description: data.description,
            image: `https://api.nomoreparties.co${data.image.url}`,
            trailerLink: data.trailerLink,
            thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
    }
    return fetch(`${this._url}/movies`, {
        method: 'POST',
        headers: {
            ...this._headers,
            'Authorization': `Bearer ${this._getToken()}`,
        },
        body: JSON.stringify(body)
})
    .then(this._checkServerResponse)
    }

    getLikedCards() {
        return fetch(`${this._url}/movies`, {
          headers: {
          ...this._headers,
          'Authorization': `Bearer ${this._getToken()}`,
        }
        })
          .then(this._checkServerResponse)
      }

    deleteCard(movieId) {
        return fetch(`${this._url}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
            ...this._headers,
            'Authorization': `Bearer ${this._getToken()}`,
            }    })
        .then(this._checkServerResponse)
    }
}

export const mainApi = new MainApi('http://localhost:3001')
   