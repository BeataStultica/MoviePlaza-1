const app = require('./app');

app.listen(process.env.PORT || 5000, '0.0.0.0', (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
});
