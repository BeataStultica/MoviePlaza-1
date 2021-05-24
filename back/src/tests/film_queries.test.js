const db = require('../queries/pool');
const { getFilms } = require('../queries/film_queries');
const { getLastFilms } = require('../queries/newfilms_queries');
describe('GET film', () => {
    test('GET film', async (done) => {
        const film = await getFilms(1, db);
        expect(film).toHaveProperty('genres');
        expect(film).toHaveProperty('comments');
        expect(film.filmname).toEqual('Семейка Аддамс');
        expect(film.genres).toContain('Комедия');
        expect(film.comments[0]).toHaveProperty('comments');
        done();
    });
    test('GET new films', async (done) => {
        const films = await getLastFilms(db);
        expect(films.length).toEqual(6);
        done();
    });
});