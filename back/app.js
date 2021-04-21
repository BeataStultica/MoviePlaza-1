const fastify = require('fastify');

const app = fastify({ logger: true });
const fastifySession = require('fastify-session');
const fastifyCookie = require('fastify-cookie');
let sessionstore = new fastifySession.MemoryStore();

const {
    getFilm,
    changefilm,
    userJoin,
    getCurrentUser,
    userLeave,
} = require('./src/users');

app.register(fastifyCookie);

app.register(require('fastify-socket.io'), {
    cors: { origin: '*' },
});

app.register(fastifySession, {
    store: sessionstore,
    cookieName: 'sessionId',
    secret: '1qwqwqwwhjehu2372e8ywhdhu92e8uids',
    cookie: { secure: false, path: '/' },
    expires: 900000,
});

app.register(require('fastify-cors'), {
    origin: 'http://localhost:3000',

    credentials: 'same-origin',
    allowMethods:
        'PROPFIND, PROPPATCH, COPY, MOVE, DELETE, MKCOL, LOCK, UNLOCK, PUT, GETLIB, VERSION-CONTROL, CHECKIN, CHECKOUT, UNCHECKOUT, REPORT, UPDATE, CANCELUPLOAD, HEAD, OPTIONS, GET, POST',
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'X-Custom-Header',
        'X-Requested-With',
        'Cookie',
    ],
});

app.register(require('./routes/index'));
app.register(require('./routes/login'));
app.register(require('./routes/filmImg'));
app.register(require('./routes/filmpage'));
app.register(require('./routes/newfilms'));
app.register(require('./routes/filmsearch'));
app.register(require('./routes/users'));
app.register(require('./routes/videos'));
app.register(require('./routes/registration'));

app.ready((err) => {
    if (err) throw err;
    app.io.on('connection', (socket) => {
        socket.on('join_room', ({ username, room }) => {
            const user = userJoin(socket.id, username, room);
            socket.join(user.room);

            socket.emit(
                'message',
                'Welcome to the MoviePlaza! Room: ' + user.room
            );

            socket.broadcast
                .to(user.room)
                .emit('message', `${user.username} has joined the room`);

            socket.broadcast.to(user.room).emit('new_user');
            const film = getFilm(user.room);
            console.log(film);
            if (film) {
                socket.emit('change_src', film.film);
            }
        });

        socket.on('chat_message', (message) => {
            const user = getCurrentUser(socket.id);
            const users = require('./test/users.json');
            const user_data = users.find(
                (person) => person.username === user.username
            );
            let picture = 'user.png';
            if (user_data) {
                picture = user_data.profile_picture;
            }
            app.io
                .to(user.room)
                .emit('chat_message', user.username, picture, message);
        });

        socket.on('play_video', () => {
            const user = getCurrentUser(socket.id);
            console.log('video started');
            app.io.to(user.room).emit('play_video');
        });

        socket.on('stop_video', () => {
            const user = getCurrentUser(socket.id);
            console.log('video paused');
            app.io.to(user.room).emit('stop_video');
        });

        socket.on('seeked', (time) => {
            const user = getCurrentUser(socket.id);
            console.log('time changed to: ' + time);
            app.io.to(user.room).emit('change_time', time);
        });

        socket.on('change_src', (filmname) => {
            const user = getCurrentUser(socket.id);
            changefilm(user.room, filmname);
            console.log('film changed to: ' + filmname);
            app.io.to(user.room).emit('change_src', filmname);
        });

        socket.on('disconnect', () => {
            const user = userLeave(socket.id);
            if (user) {
                app.io
                    .to(user.room)
                    .emit('message', `${user.username} has left the room`);
            }
        });
    });
});

app.listen(3001, (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});
