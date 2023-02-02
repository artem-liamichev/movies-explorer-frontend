import { useForm } from "react-hook-form";
import React, { useState } from "react";
function Login({ onLogin }) {
    const { register, reset, handleSubmit, formState: {isDirty, isValid, errors, ...formState } } = useForm({mode: 'onChange'});

    return (
        <form autoComplete="off" onSubmit={handleSubmit((data, e) => {
            console.log('handleSubmitdata:', data)
            e.preventDefault();
            onLogin(data); 
            reset();
            })}
            className="login">
            <div className="login__intro">
                <a className="login__logo logo link" href="/"></a>
                <h3 className="login__title">Рады видеть!</h3>
            </div>
            <label className="login__input-label">
                <span className="login__input-title">E-mail</span>
                <input 
                    {...register("email", { 
                        required: "Это обязательное поле", 
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
                            message: "Email должен быть валидным адресом электронной почты",
                        }
                        })
                    }
                    className={`login__input input ${errors?.email?.message ? 'error': ''}`}
                    placeholder="E-mail"
                    />
                <p className="error-message">{errors.email?.message}</p>            
            </label>
            <label className="login__input-label">
                <span className="login__input-title">Пароль</span>
                <input
                    {...register('password', { 
                        required: 'Это обязательное поле' })}                        
                        className={`register__input input ${errors?.password?.message ? 'error': ''}`}
                        type="password" placeholder="Пароль"
                    />
                {errors.password?.message && <p className="error-message">{errors.password?.message}</p>}            
                
            </label>
            <button disabled={!isDirty || !isValid} className={`login__submit button ${(!isDirty || !isValid) ? 'invalid': ''}`} type="submit">Войти</button>
            <p className="login__subline">Ещё не зарегистрированы? <a className="signup-link link" href="/signup">Регистрация</a></p>
        </form>
)}

export default Login;
