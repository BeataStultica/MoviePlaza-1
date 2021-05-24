//import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import './filmpage.css';
import { Link } from 'react-router-dom';
import Comment from '../../components/Comment/Comment';

const Filmpage = () => {
    const [film, setFilm] = useState({ genres: [] });
    const [isLogin, setData] = useState('');
    const [userId, setId] = useState('');
    const [comments, setComment] = useState([]);
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
    useEffect(() => {
        fetch('https://movieplazaback.herokuapp.com' + window.location.pathname)
            .then((res) => res.json())
            .then((res) => {
                setFilm(res);
                setComment(res.comments);
            });

        const getLogin = async () => {
            fetch('https://movieplazaback.herokuapp.com/', {
                withCredentials: true,
                credentials: 'include',
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    setData(res.name);
                    setId(res.id);
                });
        };
        getLogin();
    }, []);

    const addComment = () => {
        const com = document.getElementById('addComment').value;
        console.log({
            comments: com,
            userid: userId,
            filmid: Number(window.location.pathname.split('/')[2]),
        });
        fetch('https://movieplazaback.herokuapp.com/commentadd', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comments: com,
                userid: userId,
                filmid: Number(window.location.pathname.split('/')[2]),
            }),
        });
        setComment((oldcomment) => [
            { comments: com, userid: userId, commentdate: '' },
            ...oldcomment,
        ]);
        document.getElementById('addComment').value = '';
    };

    return (
        <div className="FilmContain">
            <div className="Filmpage">
                <h1>{film.filmname}</h1>
                <img
                    src={
                        'https://movieplazaback.herokuapp.com/images/' +
                        film.filmimage
                    }
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
                        <b>Рік випуску:</b> {film.dateofrelease}
                    </div>
                    <div>
                        <b>Жанри:</b> {film.genres.join(', ')}
                    </div>
                    <div>
                        <b>Довжина:</b> {film.duration} хв
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
                            <label htmlFor="star-5" title="Оцінка «5»"></label>
                            <input
                                type="radio"
                                id="star-4"
                                name="rating"
                                value="4"
                            />
                            <label htmlFor="star-4" title="Оцінка «4»"></label>
                            <input
                                type="radio"
                                id="star-3"
                                name="rating"
                                value="3"
                            />
                            <label htmlFor="star-3" title="Оцінка «3»"></label>
                            <input
                                type="radio"
                                id="star-2"
                                name="rating"
                                value="2"
                            />
                            <label htmlFor="star-2" title="Оцінка «2»"></label>
                            <input
                                type="radio"
                                id="star-1"
                                name="rating"
                                value="1"
                            />
                            <label htmlFor="star-1" title="Оцінка «1»"></label>
                        </div>
                    </div>
                    <p>Описання:</p>
                    <div className="desc">{film.informationaboutfilm}</div>
                </div>

                <div className="filmComment">
                    <p className="commentP">Коментарі:</p>
                    {isLogin ? (
                        <div className="commentSection" id={isLogin}>
                            <textarea id="addComment"></textarea>
                            <button
                                type="submit"
                                id="addCommentBtn"
                                onClick={addComment}
                            >
                                Додати коментар
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                    <div className="container">
                        {comments.map((commentar) => (
                            <div
                                className="commentcont"
                                key={commentar.userid + commentar.comments}
                            >
                                <Comment
                                    key={commentar.userid}
                                    work={commentar}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filmpage;
