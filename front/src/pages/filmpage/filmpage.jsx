import films from '../../staticStorage/all_films';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './filmpage.css';

import { Link } from 'react-router-dom';
import Comment from '../../components/Comment/Comment';
import userImg from '../../images/user.png';

class Filmpage extends Component {
    addComment() {
        let container = document.getElementsByClassName('container')[0];
        const com = document.getElementById('addComment').value;
        let div = document.createElement('div');
        div.className = 'commentcont';
        let work = {
            nickname: 'userAdder',
            avatar: userImg,
            comment: com,
        };

        if (com.trim().length > 0) {
            container.prepend(div);
            let a = Comment({ work });
            ReactDOM.render(a, div);
        }
    }
    render() {
        const id = this.props.match.params.id;
        const film = films.find((film) => film.id === id);
        return (
            <div className="FilmContain">
                <div className="Filmpage">
                    <h1>{film.title}</h1>
                    <img
                        src={film.screenshot}
                        alt="titleImg"
                        className="titleImg"
                    ></img>
                    <div className="buttonsMenu">
                        <button type="submit">Купити: {film.price}$</button>
                        <Link to="/room" className="watchroom disabled">
                            <div className="watch">
                                <p>Дивитися зараз</p>
                            </div>
                        </Link>
                    </div>

                    <div className="filmdesc">
                        <div>
                            <b>Рік випуску:</b> 2017
                        </div>
                        <div>
                            <b>Жанри:</b> Трагедія, Комедія, Абсурд
                        </div>
                        <div>
                            <b>Довжина:</b> 120 хв
                        </div>
                        <div className="filmRate">
                            <p>Оцінка фільма: </p>
                            <div className="star"></div>
                            <div className="rate">{film.rate}</div>
                        </div>
                        <div className="yourRate">
                            <p>Ваша оцінка: </p>
                            <div className="rating-area">
                                <input
                                    type="radio"
                                    id="star-5"
                                    name="rating"
                                    value="5"
                                />
                                <label
                                    htmlFor="star-5"
                                    title="Оцінка «5»"
                                ></label>
                                <input
                                    type="radio"
                                    id="star-4"
                                    name="rating"
                                    value="4"
                                />
                                <label
                                    htmlFor="star-4"
                                    title="Оцінка «4»"
                                ></label>
                                <input
                                    type="radio"
                                    id="star-3"
                                    name="rating"
                                    value="3"
                                />
                                <label
                                    htmlFor="star-3"
                                    title="Оцінка «3»"
                                ></label>
                                <input
                                    type="radio"
                                    id="star-2"
                                    name="rating"
                                    value="2"
                                />
                                <label
                                    htmlFor="star-2"
                                    title="Оцінка «2»"
                                ></label>
                                <input
                                    type="radio"
                                    id="star-1"
                                    name="rating"
                                    value="1"
                                />
                                <label
                                    htmlFor="star-1"
                                    title="Оцінка «1»"
                                ></label>
                            </div>
                        </div>
                        <p>Описання:</p>
                        <div className="desc">{film.description}</div>
                    </div>

                    <div className="filmComment">
                        <p className="commentP">Коментарі:</p>
                        <div className="commentSection">
                            <textarea id="addComment"></textarea>
                            <button
                                type="submit"
                                id="addCommentBtn"
                                onClick={this.addComment}
                            >
                                Додати коментар
                            </button>
                        </div>
                        <div className="container">
                            {film.comment.map((commentar) => (
                                <div className="commentcont" key={commentar.id}>
                                    <Comment
                                        key={commentar.id}
                                        work={commentar}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filmpage;
