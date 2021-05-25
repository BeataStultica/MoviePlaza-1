const fastify = require('fastify');
const app = fastify();
const fastifySession = require('fastify-session');
const fastifyCookie = require('fastify-cookie');
app.register(fastifyCookie);

app.register(require('fastify-socket.io'), {
    cors: { origin: '*' },
});

const pgSession = require('connect-pg-simple')(fastifySession);

app.register(fastifySession, {
    store: new pgSession({
        conObject: {
            connectionString:
                process.env.DATABASE_URL ||
                'postgres://bshemyphktauco:97f8bea4d382c99b4749da4440914853debec42bdc83771aeaf13c1a7b1822a5@ec2-34-255-134-200.eu-west-1.compute.amazonaws.com:5432/dboqj906ps4mnl',
            ssl: { rejectUnauthorized: false },
            tableName: 'session',
        },
    }),
    cookieName: 'sessionId',
    secret: '1qwqwqwwhjehu2372e8ywhdhu92e8uids',
    cookie: {
        secure: true,
        sameSite: 'None',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }, //срок дії cookie 7 днів, протокол http(secure: false)
});

app.register(require('fastify-cors'), {
    origin: ['https://movieplaza.vercel.app', 'http://localhost:3000'],

    credentials: true,
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

app.register(require('./src/routes/index'));
app.register(require('./src/routes/login'));
app.register(require('./src/routes/filmImg'));
app.register(require('./src/routes/filmpage'));
app.register(require('./src/routes/newfilms'));
app.register(require('./src/routes/filmsearch'));
app.register(require('./src/routes/users'));
app.register(require('./src/routes/profile'));
app.register(require('./src/routes/videos'));
app.register(require('./src/routes/registration'));
app.register(require('./src/routes/commentadd'));
app.register(require('./src/routes/update_user'));
app.register(require('./src/routes/setrate'));
const sock = require('./src/sockets')(app);
app.ready(sock);

module.exports = app;
