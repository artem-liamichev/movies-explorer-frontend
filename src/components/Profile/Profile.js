import React, { useState } from "react";
function Profile() {

    const [loginData, setLoginData] = useState ({
        name: 'Vitaliy',
        email: '12@mail.ru',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        })
    }

    return (
    <article>
        <form className="profile__form" noValidate>
            <h3 className="profile__title">Привет, {loginData.name}!</h3>
                <label className="input-label">
                    <span className="input-title">Имя</span>
                    <input onChange={handleChange} readOnly="readOnly" autoComplete="user-name" value={loginData.name} className="profile__input" name="name" type="text" placeholder="Имя" required minLength="2" maxLength="30" />
                </label>
                <label className="input-label">   
                    <span className="input-title">E-mail</span>
                    <input onChange={handleChange} readOnly="readOnly" autoComplete="user-email" value={loginData.email} className="profile__input" name="email" type="email" placeholder="Email" required />
                </label>
            <button className="profile__edit button" type="">Редактировать</button>
            <button className="profile__sign-out button" type="submit">Выйти из аккаунта</button>
        </form>
    </article>
)}

export default Profile;
