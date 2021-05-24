import f from './Films.module.css';
import { Link } from 'react-router-dom';

function Films({ work, iswatchroom = false, watchnow }) {
    const watch = () => {
        watchnow(work.filmreference);
    };
    return (
        <div className={f['film-container']}>
            <Link
                to={`/catalog/${work.id}`}
                className={f['film-item']}
                id={work.id}
                data-item="film"
            >
                <div className={f['item-picture']}>
                    <img
                        className={f['item-picture__img']}
                        src={
                            'https://movieplazaback.herokuapp.com/images/' +
                            work.filmimage
                        }
                        alt={work.filmimage}
                    />
                </div>
                <div className={f['item-title']}>
                    <p>{work.filmname}</p>
                </div>
                <div className={f['item-desc']}>
                    <p className={f['catalog_rate']}>
                        Рейтинг фільму:{work.rate}
                    </p>
                    <p>{work.informationaboutfilm}</p>
                </div>
            </Link>
            {iswatchroom ? (
                <button
                    className={f['watch_btn']}
                    id={work.filmname}
                    onClick={watch}
                >
                    Дивитись зараз
                </button>
            ) : (
                ''
            )}
        </div>
    );
}
export default Films;
