const { getIsLogin } = require('../queries/login_queries');

function routes(fastify, opts, done) {
    fastify.post('/login', (request) => {
        const { username, password } =JSON.parse(request.body);
        console.log(request.body);
        const user = getIsLogin(username, password);
        console.log(user);
        if (user){      
            request.session.authenticated = true;
            request.session.user = { name: username, userid: '1' };
            request.sessionstorage = request.session;
            return { success: 'true'};
        } else {
            request.session.authenticated = false;
            return { success: 'false' };
        }
    });
    done();
}
module.exports = routes;
