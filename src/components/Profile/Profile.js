import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Link} from 'react-router-dom';
import { CurrenUserContext } from '../../contexts/CurrentUserContext';

function Profile({ isUpdateUserFailed, isUpdateUserCompleted, onLogout, onUpdateUser }) {
    const { register, reset, handleSubmit, setValue, watch, formState: {isDirty, isValid, errors, ...formState } } = useForm({mode: 'onChange'});

    const currentUser = React.useContext(CurrenUserContext);

    const [userName, setUserName] = useState('') 
    const [userEmail, setUserEmail] = useState('') 

    const currentName = watch("name");
    const currentEmail = watch("email");

    console.log('currentName:', currentName)

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
            console.log('handleSubmitdata:', data)
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
            >Привет, {currentUser.name}!</h3>
            {isUpdateUserCompleted && (<h2 className="tooltip__title">Вы успешно обновили данные!</h2>)}
            {isUpdateUserFailed && (<h2 className="tooltip__title">Что-то пошло не так!</h2>)}

                <label className="input-label">
                    <span className="input-title">Имя</span>
                    <input 
                        {...register("name", { 
                            required: "Это обязательное поле",  
                            pattern: {
                                value: /^[a-zа-яё -]+$/i, 
                                message: "Имя должно быть валидным",
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
                            required: "Это обязательное поле", 
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
                                message: "Email должен быть валидным адресом электронной почты",
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
                className="profile__edit button" type="button">Редактировать</button>

            <button
                style={{display: `${(!(errors.name?.message || errors.email?.message) & !((currentUser.name===currentName)&(currentUser.email===currentEmail)))? 'block' : 'none'}`}} 
                className="profile__save button" type="submit">Сохранить</button>

            <Link to="/">
                <button onClick={onLogout} className="profile__sign-out button" type="button">Выйти из аккаунта</button>
            </Link>
        </form>
    </article>
)}

export default Profile;
