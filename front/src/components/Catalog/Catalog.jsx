import Filter from '../Filter/Filter';
import Films from '../Films/Films';
import c from './Catalog.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Catalog = () => {
    const [films, setFilms] = useState([]);

    useEffect(()=>{
        axios
            .get(
                'http://localhost:3001/catalog'
            )
            .then(res => res.data).then(res => setFilms(res));
    }, []
    );

    const search = (searchValue, genre=null, year_from=null, year_to=null, len_from=null, len_to=null, price_from=null, price_to=null, rate_from=null, rate_to=null) =>{
        axios
            .get(
                `http://localhost:3001/catalog?value=${searchValue}&genre=${genre}&yearfrom=${year_from}&yearto=${year_to}&lenfrom=${len_from}&lento=${len_to}&pricefrom=${price_from}&priceto=${price_to}&ratefrom=${rate_from}&rateto=${rate_to}`
            )
            .then(res => res.data).then(res => setFilms(res)).then(()=>{
                console.log('+');
                console.log(films);
                console.log('+');
            });
    };
    return (
        <div className="Catalog">
            <Filter search={search}/>
            <div className={c.container}>
                {films.map((film) => (
                    <Films key={film.id} work={film} />
                ))}
            </div>
        </div>
    );
};

export default Catalog;
