import Slider from '../components/Slider/Slider';

import Films from '../components/Films/Films';

import c from '../components/Catalog/Catalog.module.css';
import { useEffect, useState } from 'react';

function Home() {
    const [datafilm, setData] = useState([]);

    useEffect(() => {
        const getfilm = () => {
            fetch('https://movieplazaback.herokuapp.com/newfilms', {
                withCredentials: true,
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => setData(data));
        };
        getfilm();
    }, []);

    return (
        <div className="Home">
            <Slider />
            <div className={c.container}>
                {datafilm.map((film) => (
                    <Films key={film.filmname} work={film} />
                ))}
            </div>
        </div>
    );
}

export default Home;
