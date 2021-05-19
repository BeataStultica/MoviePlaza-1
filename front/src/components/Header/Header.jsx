import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import h from './Header.module.css';

import logo from './../../images/Logo.png';
import search_img from './../../images/search.png';

const { v4: uuidV4 } = require('uuid');

function Header() {
    const [isLogin, setData] = useState('');

    useEffect(() => {
        const getLogin = async () => {
            fetch('https://movieplazaback.herokuapp.com/', {
                withCredentials: true,
                credentials: 'include',
            })
                .then((res) => res.json())
                .then((res) => {
                    setData(res.name);
                });
        };
        getLogin();
    });
    const logout = async () => {
        const promise = await fetch('https://movieplazaback.herokuapp.com/logout', {
            withCredentials: true,
            credentials: 'include',
        });
        console.log(promise);
        window.location.reload();
    };

    return (
        <header className={h.header}>
            <div className={h['header-wrapper']}>
                <div className={h.navbar}>
                    <Link to="/" className={h['header-logo']}>
                        <img src={logo} alt="logo" id={h.logo_img} />
                        <span>MoviePlaza</span>
                    </Link>
                    <Link to="/catalog" className={h['header-link']}>
                        <span>Фільми</span>
                    </Link>
                    <Link to={'/room/' + uuidV4()} className={h['header-link']}>
                        <span>Створити кімнату</span>
                    </Link>
                </div>
                <div className={h['search-bar']}>
                    <div className={h['header-search']}>
                        <input
                            id={h['film-search']}
                            type="search"
                            placeholder="Пошук фільму"
                        ></input>
                        {/*добавити onclick для img або замінити img на button i знайти спосіб як поставити на фон кнопки картинку */}
                        <img
                            src={search_img}
                            alt="search"
                            id={h.search_img}
                            //onClick={this.test}
                        />
                    </div>
                </div>
                {isLogin ? (
                    <div>
                        <a href={'/profile/' + isLogin}>{isLogin}</a>
                        <button onClick={logout}>logout</button>
                    </div>
                ) : (
                    <div className={h['user-bar']}>
                        <Link to="/login" className={h['header-link']}>
                            <div id={h.enter}>Увійти</div>
                        </Link>
                        <Link to="/registration" className={h['header-link']}>
                            <div id={h.register}>Зареєструватися</div>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
