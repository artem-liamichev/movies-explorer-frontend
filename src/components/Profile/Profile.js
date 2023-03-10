import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Link} from 'react-router-dom';
import { CurrenUserContext } from '../../contexts/CurrentUserContext';
import { useTranslation } from "react-i18next";

function Profile({ isUpdateUserFailed, isUpdateUserCompleted, onLogout, onUpdateUser }) {
    const { t } = useTranslation();
    const { register, reset, handleSubmit, setValue, watch, formState: {isDirty, isValid, errors, ...formState } } = useForm({mode: 'onChange'});

    const currentUser = React.useContext(CurrenUserContext);

    const [userName, setUserName] = useState('') 
    const [userEmail, setUserEmail] = useState('') 

    const currentName = watch("name");
    const currentEmail = watch("email");

    React.useEffect(() => {
        setValue('name', currentUser.name);
        setValue('email', currentUser.email);
        
      }, [currentUser]); 

    function handleEditClick() {
        document.querySelectorAll('.profile__input')[0].disabled = false;
        document.querySelectorAll('.profile__input')[1].disabled = false;
        document.querySelectorAll('.profile__input')[0].style.backgroundColor = '#394e55';
        document.querySelectorAll('.profile__input')[1].style.backgroundColor = '#394e55';
    }

    return (
    <article>
        <form autoComplete="off" onSubmit={handleSubmit((data, e) => {
            e.preventDefault();
            onUpdateUser(data); 
            document.querySelectorAll('.profile__input')[0].disabled = true;
            document.querySelectorAll('.profile__input')[1].disabled = true;
            document.querySelectorAll('.profile__input')[0].style.backgroundColor = '#202020';
            document.querySelectorAll('.profile__input')[1].style.backgroundColor = '#202020';
                reset();
            })}
            className="profile">
            <h3 className="profile__title"
                                style={{display: `${(isUpdateUserCompleted || isUpdateUserFailed ) ? 'none' : ''}`}} 
            >{t('hello')}, {currentUser.name}!</h3>
            {isUpdateUserCompleted && (<h2 className="tooltip__title">{t('tooltip-success')}</h2>)}
            {isUpdateUserFailed && (<h2 className="tooltip__title">{t('tooltip-fail')}</h2>)}

                <label className="input-label">
                    <span className="input-title">{t('name')}</span>
                    <input 
                        {...register("name", { 
                            required: t('required-field'),  
                            pattern: {
                                value: /^[a-zа-яё -]+$/i, 
                                message: t('valid-name'),
                            },
                            onChange: (e) => {setUserName(e.target.value)}
                        })}
                        className={`profile__input input ${errors?.name?.message ? 'error': ''}`}
                        autoComplete="off" 
                        placeholder="Имя" 
                        disabled={true}
                        />
                    {errors.name?.message &&
                        <p className="error-message profile-input-error">{errors.name?.message}</p>
                    }
                </label>
                <label className="input-label">   
                    <span className="input-title">E-mail</span>
                    <input
                        {...register("email", { 
                            required: t('required-field'),  
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
                                message: t('valid-email'),
                            },
                            onChange: (e) => {setUserEmail(e.target.value)}
                            })
                        }
                        className={`profile__input input ${errors?.email?.message ? 'error': ''}`}
                        placeholder="E-mail"
                        autoComplete="off" 
                        disabled={true}
                        />
                    {errors.email?.message &&
                        <p className="error-message profile-input-error">{errors.email?.message}</p>
                    }
                </label>

            <button onClick={handleEditClick} 
                style={{display: `${(errors.name?.message || errors.email?.message || ((currentUser.name===currentName)&(currentUser.email===currentEmail)))? 'block' : 'none'}`}} 
                className="profile__edit button" type="button">{t('edit')}</button>

            <button
                style={{display: `${(!(errors.name?.message || errors.email?.message) & !((currentUser.name===currentName)&(currentUser.email===currentEmail)))? 'block' : 'none'}`}} 
                className="profile__save button" type="submit">{t('save')}</button>

            <Link to="/">
                <button onClick={onLogout} className="profile__sign-out button" type="button">{t('logout')}</button>
            </Link>
        </form>
    </article>
)}

export default Profile;
