import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Register({ onRegister }) {
    const { register, reset, handleSubmit, formState: {isDirty, isValid, errors, ...formState } } = useForm({mode: 'onChange'});    
    return (
        <form autoComplete="off" onSubmit={handleSubmit((data, e) => {
            e.preventDefault();
            onRegister(data); 
            reset();
            })}
            className="register">
                <div className="register__intro">
                    <a className="register__logo logo link" href="/"></a>
                    <h3 className="register__title">Добро пожаловать!</h3>
                </div>
                <label className="register__input-label">
                    <span className="register__input-title">Имя</span>
                    <input
                        {...register("name", { 
                            required: "Это обязательное поле",  
                            pattern: {
                                value: /^[a-zа-яё -]+$/i, 
                                message: "Имя должно быть валидным",
                            }
                        })}
                        className={`register__input input ${errors?.name?.message ? 'error': ''}`}
                        autoComplete="off" 
                        type="text" 
                        placeholder="Имя"
                        minLength="2"
                        maxLength="30" />
                    <p className="error-message">{errors.name?.message}</p>
                </label>
                <label className="register__input-label">
                    <span className="register__input-title input">E-mail</span>
                    <input 
                        {...register("email", { 
                            required: "Это обязательное поле", 
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
                                message: "Email должен быть валидным адресом электронной почты",
                            }
                            })
                        }
                        className={`register__input input ${errors?.email?.message ? 'error': ''}`}
                        autoComplete="off" 
                        placeholder="E-mail"
                        />                    
                <p className="error-message">{errors.email?.message}</p>
                </label>
                <label className="register__input-label">
                    <span className="register__input-title input">Пароль</span>
                    <input 
                        {...register('password', { 
                            required: 'Это обязательное поле' })}                        
                            className={`register__input input ${errors?.password?.message ? 'error': ''}`}
                        autoComplete="off" 
                        type="password" 
                        placeholder="Пароль"  />
                    <p className="error-message">{errors.password?.message}</p>
                </label>
                <button disabled={!isDirty || !isValid} className={`register__submit button ${(!isDirty || !isValid) ? 'invalid': ''}`} type="submit">Зарегистрироваться</button>
                <p className="register__subline">Уже зарегистрированы? <a href="/signin" className="signin-link link">Войти</a></p>
        </form>
)}
export default Register;
