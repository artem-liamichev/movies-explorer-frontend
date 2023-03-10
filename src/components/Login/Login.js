import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';

function Login({ onLogin }) {
    
    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
      };
      
    const emailInputRef = React.useRef();
    const passwordInputRef = React.useRef();

    const { setValue, register, reset, handleSubmit, formState: {isDirty, isValid, errors, ...formState } } = useForm({mode: 'onChange'});

    function handleEnterTestUser() {
        setValue('email', 'test@test.cl', { shouldDirty: true, shouldValidate: true });
        setValue('password', 'test', { shouldDirty: true, shouldValidate: true });
    }

    return (
        <form autoComplete="off" onSubmit={handleSubmit((data, e) => {
            e.preventDefault();
            console.log('data:', data)
            onLogin(data); 
            reset();
            })}
            className="login">
            <div className="login__intro">
                <div className="login__inner">
                    <a className="login__logo logo link" href="/"></a>
                    <div className="header__lang-links">
                        <a onClick={() => changeLanguage("en")} className={`${i18n.language==='en' ? 'header__lang-link header__lang-link_active' : 'header__lang-link'}`} data-btn="en">En</a>
                        <a onClick={() => changeLanguage("ru")} className={`${i18n.language==='ru' ? 'header__lang-link header__lang-link_active' : 'header__lang-link'}`} data-btn="ru">Ru</a>
                    </div>
                </div>
                <h3 className="login__title">{t('great-to-see-you')}</h3>
            </div>
            <label className="login__input-label">
                <span className="login__input-title">E-mail</span>
                <input 
                    {...register("email", { 
                        required: t('required-field'),  
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
                            message: t('valid-email'),
                        }
                        })
                    }
                    className={`login__input input ${errors?.email?.message ? 'error': ''}`}
                    placeholder="E-mail"
                    // ref={emailInputRef}
                    />
                <p className="error-message">{errors.email?.message}</p>            
            </label>
            <label className="login__input-label">
                <span className="login__input-title">{t('password')}</span>
                <input
                    {...register("password", { 
                        required: t('required-field') })}                        
                        className={`register__input input ${errors?.password?.message ? 'error': ''}`}
                        type="password" placeholder={t('password')}
                    />
                {errors.password?.message && <p className="error-message">{errors.password?.message}</p>}            
                
            </label>
            <button disabled={!isDirty || !isValid} className={`login__submit button ${(!isDirty || !isValid) ? 'invalid': ''}`} type="submit">{t('login')}</button>
            <p className="login__subline">{t('not-registered')} <a className="signup-link link" href="/signup">{t('registration')}</a></p>
            <p className="login__subline">Или <a className="signup-link link" onClick={handleEnterTestUser} >войти в тестовый аккаунт</a></p>
        </form>
)}

export default Login;
