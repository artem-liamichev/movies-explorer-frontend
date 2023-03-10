import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';

function Register({ onRegister }) {

    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
      };

    const { register, reset, handleSubmit, formState: {isDirty, isValid, errors, ...formState } } = useForm({mode: 'onChange'});    
    
    return (
        <form autoComplete="off" onSubmit={handleSubmit((data, e) => {
            e.preventDefault();
            onRegister(data); 
            reset();
            })}
            className="register">
                <div className="register__intro">
                    <div className="register__inner">
                        <a className="register__logo logo link" href="/"></a>
                        <div className="header__lang-links">
                            <a onClick={() => changeLanguage("en")} className={`${i18n.language==='en' ? 'header__lang-link header__lang-link_active' : 'header__lang-link'}`} data-btn="en">En</a>
                            <a onClick={() => changeLanguage("ru")} className={`${i18n.language==='ru' ? 'header__lang-link header__lang-link_active' : 'header__lang-link'}`} data-btn="ru">Ru</a>
                        </div>
                    </div>
                    <h3 className="register__title">{t('welcome-message')}</h3>
                </div>
                <label className="register__input-label">
                    <span className="register__input-title">{t('name')}</span>
                    <input
                        {...register("name", { 
                            required: t('required-field'),  
                            pattern: {
                                value: /^[a-zа-яё -]+$/i, 
                                message: t('valid-name'),
                            }
                        })}
                        className={`register__input input ${errors?.name?.message ? 'error': ''}`}
                        autoComplete="off" 
                        type="text" 
                        placeholder={t('name')}
                        minLength="2"
                        maxLength="30" />
                    <p className="error-message">{errors.name?.message}</p>
                </label>
                <label className="register__input-label">
                    <span className="register__input-title input">E-mail</span>
                    <input 
                        {...register("email", { 
                            required: t('required-field'),  
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
                                message: t('valid-email'),
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
                    <span className="register__input-title input">{t('password')}</span>
                    <input 
                        {...register('password', { 
                            required: t('required-field') })}                        
                            className={`register__input input ${errors?.password?.message ? 'error': ''}`}
                        autoComplete="off" 
                        type="password" 
                        placeholder={t('password')}  />
                    <p className="error-message">{errors.password?.message}</p>
                </label>
                <button disabled={!isDirty || !isValid} className={`register__submit button ${(!isDirty || !isValid) ? 'invalid': ''}`} type="submit">{t('registration')}</button>
                <p className="register__subline">{t('already-registered')} <a href="/signin" className="signin-link link">{t('login')}</a></p>
        </form>
)}
export default Register;
