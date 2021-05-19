import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { io } from 'socket.io-client';
import Search from './../SearchSystem/Search';
import Films from './..//Films/Films';
import w from './Watchroom.module.css';

const Watchroom = (params) => {
    const ENDPOINT = 'localhost:3001';
    const [films, setFilms] = useState([]);
    const [videosource, setSource] = useState('');
    const [currSocket, setSocket] = useState();
    const search = (searchValue) => {
        fetch(`https://movieplazaback.herokuapp.com/catalog?value=${searchValue}`)
            .then((res) => res.json())
            .then((res) => setFilms(res))
            .then(console.log(films));
    };
    const watchnow = (filmname) => {
        setSource(`https://movieplazaback.herokuapp.com/videos/${filmname}.mp4`);
        document.getElementById('videoPlayer').load();
        currSocket.emit('change_src', filmname);
    };
    useEffect(() => {
        const socket = io.connect(ENDPOINT);
        setSocket(socket);
        const video = document.getElementById('videoPlayer');
        const room = window.location.pathname.substr(6);
        let playPromise = undefined;
        let username = '';
        let seeked = false;
        let promiseUser = new Promise(function (resolve, reject) {
            const user = fetch('https://movieplazaback.herokuapp.com/', {
                withCredentials: true,
                credentials: 'include',
            }).then((res) => res.json());
            resolve(user);
        });

        promiseUser.then((result) => {
            if (result.name) {
                username = result.name;
            } else {
                username = 'Guest' + String(Math.floor(Math.random() * 10000));
            }
            socket.emit('join_room', { username, room });
        });

        socket.on('message', (message) => {
            console.log(message);
        });

        socket.on('new_user', () => {
            video.currentTime = video.currentTime + 0;
            video.pause();
        });
        socket.on('connect', () => {
            video.muted = true;
            console.log(`Client connected: ${socket.id}`);
        });
        socket.on('change_src', (src) => {
            setSource(`https://movieplazaback.herokuapp.com/videos/${src}.mp4`);
            document.getElementById('videoPlayer').load();
        });
        // send message to chat
        socket.on('chat_message', (username, pict, text) =>
            createMessage(username, pict, text)
        );

        document.getElementById('chat-button').onclick = () => {
            const text = document.getElementById('chat-input').value;
            document.getElementById('chat-input').value = '';
            socket.emit('chat_message', text);
        };

        // play video
        socket.on('play_video', () => {
            playPromise = video.play();
        });
        video.addEventListener('play', () => {
            socket.emit('play_video');
        });

        // stop video
        socket.on('stop_video', () => {
            if (playPromise !== undefined) {
                playPromise.then((_) => {
                    video.pause();
                    if (seeked) {
                        seeked = false;
                    }
                });
            }
        });
        video.addEventListener('pause', () => {
            if (!seeked) {
                socket.emit('stop_video');
            } else {
                seeked = false;
                video.play();
            }
        });

        // change video time
        socket.on('change_time', async (time) => {
            if (
                video.currentTime !== time &&
                Math.abs(video.currentTime - time) >= 0.5
            ) {
                if (!seeked) {
                    //video.currentTime = time;
                    seeked = true;
                    console.log('seeked-change');
                }
                video.currentTime = time;
            }
        });
        video.onseeking = () => {
            seeked = true;
            //console.log('seeked-onseek');
            socket.emit('seeked', video.currentTime);
        };
        // disconnect
        socket.on('disconnect', () => console.log('Client disconnected'));
    }, [ENDPOINT]);

    return (
        <div className={w['container']}>
            <div className={w.watchroom}>
                <div className={w['watchroom-player']}>
                    <video className={w['video']} id="videoPlayer" controls>
                        <source src={videosource} />
                    </video>
                </div>
                <div className={w['watchroom-chat']}>
                    <div className={w['chat-buttons']}>
                        <CopyToClipboard text={window.location.href}>
                            <button className={w['chat-buttons__copy']}>
                                Копировать путь к комнате
                            </button>
                        </CopyToClipboard>
                    </div>

                    <div
                        className={w['chat-messages']}
                        data-messages="messages-holder"
                    ></div>

                    <div className={w['chat-input']}>
                        <input
                            className={w['chat-input__input']}
                            type="text"
                            placeholder="Введите сообщение"
                            id="chat-input"
                        ></input>
                        <button
                            className={w['chat-input__send']}
                            type="button"
                            id="chat-button"
                        >
                            <span>&#10003;</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className={w['movie_select']}>
                <Search search={search}></Search>
                <div>
                    <div className={w['film_container']}>
                        {films.map((film) => (
                            <Films
                                key={film.filmname}
                                work={film}
                                iswatchroom={true}
                                watchnow={watchnow}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const createMessage = (username, pict, text) => {
    const today = new Date();
    const time = today.getHours() + ':' + today.getMinutes();

    const message = document.createElement('div');
    message.className = w.message;

    const message_avatar = document.createElement('div');
    message_avatar.className = w['message-avatar'];

    const message_avatar_image = document.createElement('img');
    console.log(username);
    message_avatar_image.className = w['message-avatar__image'];
    message_avatar_image.src = 'https://movieplazaback.herokuapp.com/images/' + pict;
    message_avatar_image.alt = 'avatar';
    message_avatar.appendChild(message_avatar_image);
    message.appendChild(message_avatar);

    const message_content = document.createElement('div');
    message_content.className = w['message-content'];

    const username_div = document.createElement('div');
    username_div.className = w['message-content__username'];

    const anchor = document.createElement('a');
    anchor.className = w['link-to-user'];
    anchor.href = '/' + username;
    anchor.innerText = username;
    username_div.appendChild(anchor);

    const small = document.createElement('small');
    small.className = w['current-time'];
    small.innerText = time;
    username_div.appendChild(small);

    message_content.appendChild(username_div);

    const message_text = document.createElement('div');
    message_text.className = w['message-content__text'];
    message_text.innerText = text;
    message_content.appendChild(message_text);
    message.appendChild(message_content);

    document.querySelector('[data-messages]').append(message);
};

export default Watchroom;
