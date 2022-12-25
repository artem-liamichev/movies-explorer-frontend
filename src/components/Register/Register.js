import React, { useState } from "react";
function Register() {

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
        <form className="register" noValidate>
            <div className="register__intro">
                <a className="register__logo logo link" href="/"></a>
                <h3 className="register__title">Добро пожаловать!</h3>
            </div>
            <label className="register__input-label">
                <span className="register__input-title">Имя</span>
                <input className="register__input" onChange={handleChange} autoComplete="off" value={loginData.name} name="name" type="text" placeholder="Имя" required minLength="2" maxLength="30" />
            </label>
            <label className="register__input-label">
                <span className="register__input-title">E-mail</span>
                <input className="register__input" onChange={handleChange} autoComplete="off" value={loginData.email} name="email" type="email" placeholder="E-mail" required minLength="2" maxLength="30" />
            </label>
            <label className="register__input-label">
                <span className="register__input-title">Пароль</span>
                <input className="register__input" onChange={handleChange} autoComplete="off" value={loginData.password} name="password" type="password" placeholder="Пароль" required minLength="2" maxLength="30" />
            </label>
            <button className="register__submit button" type="submit">Зарегистрироваться</button>
            <p className="register__subline">Уже зарегистрированы? <a href="/signin" className="signin-link link">Войти</a></p>
        </form>
)}

export default Register;
