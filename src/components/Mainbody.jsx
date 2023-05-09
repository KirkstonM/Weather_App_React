import React, { useEffect, useState } from 'react';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, weatherData, returnedError } from '../features/appSlice';


function Mainbody() {

    const [query, setQuery] = useState("");
    const weatherDetails = useSelector(weatherData);
    const errors = useSelector(returnedError);
    const dispatch = useDispatch();


    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    //FINDING THE CURRENT DAY AND DATE
    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    const dateStr = `${month}/${day}/${year}`;


    // FETCH DATA
    const fetchData = () => {
        const INITIAL_QUERY = 'london';
        dispatch(fetchWeather(INITIAL_QUERY));
    };

    useEffect(() => {
        fetchData();
    }, [dispatch])

    //FETCH DATA WHEN STATE IS ENTERED
    const handlSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchWeather(query));
        setQuery('');
    }
    return (
        
        <div className= {
            (typeof weatherDetails.main != "undefined") ?
            ((weatherDetails.main.temp < 28 ) ?
            'main dark' : 'main')
            : 'app'}
        >
            <section className='input-form'>
                <input
                    type='text'
                    name='query'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button onClick={handlSubmit}> Search </button>
            </section>
            {(typeof weatherDetails.main != "undefined") ?

                (<>

                    {errors ? (<div className='error-body'> {errors.error} </div>)
                        :
                        (<div>
                            <div className='location'>
                                <h3> {weatherDetails.name}, {weatherDetails.sys.country} </h3>
                            </div>

                            <div className='temperature'>
                                <div className='temperature-details'>
                                    <h1> {Math.round(weatherDetails.main.temp)}&deg;C</h1>
                                    <div className='decription'>
                                        {weatherDetails.weather.map(item => <p>{item.description}</p>)}
                                    </div>
                                </div>
                            </div>

                            <section className='day-time-section'>
                                <div className='day'>{dayOfWeek}</div>
                                <div className='date'>{dateStr}</div>
                            </section>
                        </div>)}

                </>) : (<></>)}

        </div>
    )
}

export default Mainbody