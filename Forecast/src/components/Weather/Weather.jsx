import React, { useState } from 'react'
import './weather.css'
import search from '../img/search.svg'
import humidity from '../img/humidity.svg'
import windSpeed from '../img/wind-speed.svg'

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = '911826e3c1f9962a828be9e590d8530c';
  
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
          throw new Error('City not found');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError('City not found');
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };
  
    const handleInputChange = (e) => {
      setCity(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetchWeatherData();
      setCity('')
    };
  
    return (
      <div className='weather'>
        <form className='form' onSubmit={handleSubmit}>
          <input className='form__input'
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={handleInputChange}
          />
          <button type="submit"><img src={search} alt="" /></button>
        </form>
  
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
  
        {weatherData && (
            <>
          <div className='weather__info'>
            {weatherData.weather[0].icon && (
              <img className='weather__img'
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="Weather Icon"
              />
            )}
            <p className='weather__temp'>{Math.round(weatherData.main.temp)} °C</p>
            <h2 className='weather__city'>{weatherData.name}, {weatherData.sys.country}</h2>
            <p>Weather today: {weatherData.weather[0].description}</p>
          </div>
          <div className='weather__details'>
            <div className='details'>
                <img className='details__img' src={humidity} alt="" />
            <p className='details__value'>{weatherData.main.humidity} %</p>
            <p className='details__title'>Humidity</p>
            </div>
            <div className="details">
            <img className='details__img' src={windSpeed} alt="" />
            <p className='details__value'>{weatherData.wind.speed} km/h</p>
            <p className='details__title'>Wind Speed</p>
            </div>
            </div>
          </>
        )}
      </div>
    );
}

export default Weather