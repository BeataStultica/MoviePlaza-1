import a from './Account.module.css';
import React, { useEffect, useState } from 'react';

function Account(params) {
    const [user, setUser] = useState({
        bdate: '',
        firstname: '',
        secondname: '',
        favourgenre: '',
    });
    const [isLogin, setData] = useState([]);
    const [nameValue, setnameValue] = useState('');
    const [surnameValue, setsurnameValue] = useState('');
    const [bdate, setBdate] = useState('');
    const [genre, setGenre] = useState('');
    const handleNameInputChanges = (e) => {
        setnameValue(e.target.value);
    };
    const handleSurnameInputChanges = (e) => {
        setsurnameValue(e.target.value);
    };
    const handleBdateChanges = (e) => {
        setBdate(e.target.value);
    };
    const handleGenreChanges = (e) => {
        setGenre(e.target.value);
    };
    const updateProfile = () => {
        console.log({
            firstname: nameValue,
            secondname: surnameValue,
            bdate: bdate,
            favourgenre: genre,
            login: isLogin,
        });
        fetch('https://movieplazaback.herokuapp.com/updateprofile', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: document.getElementById('name').value,
                secondname: document.getElementById('surname').value,
                bdate: document.getElementById('bdate').value,
                favourgenre: document.getElementById('filter-genre').value,
                login: isLogin,
            }),
        });
    };
    useEffect(() => {
        fetch('https://movieplazaback.herokuapp.com/', {
            withCredentials: true,
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((res) => {
                setData(res.name);
            });

        fetch('https://movieplazaback.herokuapp.com/profile/' + params.user)
            .then((res) => res.json())
            .then((res) => {
                setUser(res);
            });
    }, [params.user, isLogin]);

    return (
        <div className={a.Account}>
            <div className={a.profile}>
                <div className={a['profile-main']}>
                    <div className={a['profile-avatar']}>
                        <img
                            className={a['profile-avatar__img']}
                            src={
                                'https://movieplazaback.herokuapp.com/images/' + user.userimage
                            }
                            alt="avatar"
                        />
                    </div>
                    <div className={a['profile-name']}>
                        <span className={a.username}>{params.user}</span>
                    </div>
                </div>

                <div className={a['profile-description']}>
                    <div className={a['user-description']}>
                        <span>Про себе:</span>
                        <ul>
                            <li>
                                {isLogin === params.user ? (
                                    <label>
                                        Імя:{' '}
                                        <input
                                            onChange={handleNameInputChanges}
                                            id="name"
                                            value={nameValue || user.firstname}
                                        ></input>
                                    </label>
                                ) : (
                                    'Імя: ' + user.firstname
                                )}
                            </li>
                            <li>
                                {isLogin === params.user ? (
                                    <label>
                                        Прізвище:{' '}
                                        <input
                                            onChange={handleSurnameInputChanges}
                                            id="surname"
                                            value={
                                                surnameValue || user.secondname
                                            }
                                        ></input>
                                    </label>
                                ) : (
                                    'Прізвище: ' + user.secondname
                                )}
                            </li>
                            <li>
                                {isLogin === params.user ? (
                                    <label>
                                        День народження:{' '}
                                        <input
                                            type="date"
                                            id="bdate"
                                            value={
                                                bdate ||
                                                user.bdate.split('T')[0]
                                            }
                                            min="1900-01-01"
                                            onChange={handleBdateChanges}
                                        ></input>
                                    </label>
                                ) : (
                                    'День народження: ' +
                                    user.bdate.split('T')[0]
                                )}
                            </li>
                        </ul>
                    </div>

                    <div className={a['user-favourites']}>
                        <span>Уподобання:</span>
                        <ul>
                            <li>
                                {isLogin === params.user ? (
                                    <label>
                                        Улюблений жанр:{' '}
                                        <select
                                            id="filter-genre"
                                            value={genre || user.favourgenre}
                                            onChange={handleGenreChanges}
                                        >
                                            <option>Жанр</option>
                                            <option value="Комедия">
                                                Комедія
                                            </option>
                                            <option value="Фэнтези">
                                                Фентезі
                                            </option>
                                            <option value="Боевик">
                                                Бойовик
                                            </option>
                                            <option value="Детектив">
                                                Детектив
                                            </option>
                                            <option value="Ужасы">Жахи</option>
                                            <option value="Триллер">
                                                Триллер
                                            </option>
                                            <option value="Драма">Драма</option>
                                        </select>
                                    </label>
                                ) : (
                                    'Улюблений жанр: ' +
                                    (user.favourgenre !== undefined
                                        ? user.favourgenre
                                        : '')
                                )}
                            </li>
                        </ul>
                    </div>
                    <div className={a['changebtn']}>
                        {isLogin === params.user ? (
                            <button onClick={updateProfile}>
                                Редагувати профіль
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
