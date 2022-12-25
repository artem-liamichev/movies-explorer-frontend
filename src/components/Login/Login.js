import React, { useState } from "react";
function Login() {

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
        <form className="login" noValidate>
            <div className="login__intro">
                <a className="login__logo logo link" href="/"></a>
                <h3 className="login__title">Рады видеть!</h3>
            </div>
            <label className="login__input-label">
                <span className="login__input-title">E-mail</span>
                <input className="login__input" onChange={handleChange} autoComplete="off" value={loginData.email} name="email" type="email" placeholder="E-mail" required minLength="2" maxLength="30" />
            </label>
            <label className="login__input-label">
                <span className="login__input-title">Пароль</span>
                <input className="login__input" onChange={handleChange} autoComplete="off" value={loginData.password} name="password" type="password" placeholder="Пароль" required minLength="2" maxLength="30" />
            </label>
            <button className="login__submit button" type="submit">Войти</button>
            <p className="login__subline">Ещё не зарегистрированы? <a className="signup-link link" href="/signup">Регистрация</a></p>
        </form>
)}

export default Login;
