/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useEffect, useState, useRef, useContext,
} from 'react';
import axios from 'axios';
import _ from 'lodash';
import cn from 'classnames';
import searchIcon from '../images/SearchIcon.svg';
import routes from '../routes';
import WeatherContext from '../context/weatherContext';
import BtnArrow from '../images/BtnArrow.svg';
import { parseForecast, parseWeatherData, parseCityData } from '../utils/parseFunctions';
import './SearchPanel.css';

/* UTILS */

const cutArr = (arr, number = 5) => arr.slice(0, number);

const getCities = (city, cities) => {
  const checkedCities = cities.find((item) => item.cityName === city.cityName);
  if (checkedCities) {
    return cities;
  }
  return cutArr([city, ...cities]);
};

/* SEARCH PANEL */

const SearchPanel = ({ closeBtn, searchPanel }) => {
  const inputEl = useRef();
  const [inputValue, setValue] = useState('Москва');
  const [error, setError] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    weatherData,
    setForeCastData,
    setWeatherData,
    setLoading,
    activeCity,
    setActiveCity,
    searched,
    addSearched,
  } = useContext(WeatherContext);

  const wheatherKey = process.env.REACT_APP_WEATHER_API_KEY;

  const makeWeatherRequest = async (lat, lon, key) => {
    setLoading(true);
    try {
      const weather = await axios.get(routes.weatherRoute(lat, lon, key));
      console.log(weather.data);
      const forecast = await axios.get(routes.forecastRoute(lat, lon, key));
      if (weather.status === 200 && forecast.status === 200) {
        setForeCastData(parseForecast(forecast.data));
        setWeatherData(parseWeatherData(weather.data));
        setLoading(false);
        closeBtn('close');
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
      inputEl.current.focus();
    }
  };

  const handleChange = (e) => {
    setError(null);
    setValue(e.target.value);
  };

  const handleActiveClick = (city) => {
    makeWeatherRequest(city.lat, city.lon, wheatherKey);
    setActiveCity(city);
    closeBtn();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (inputValue === '') {
        throw new Error('Поле не должно быть пустым!');
      }
      const response = await axios.get(routes.cityRoute(inputValue));
      if (response.status === 200 && response.data.length > 0) {
        const cityData = parseCityData(response.data[0]);
        const citiesToDisplay = getCities(cityData, searched);
        setActiveCity({ ...cityData });
        addSearched(citiesToDisplay);
        setValue('');
        setSubmitting(false);
        makeWeatherRequest(cityData.lat, cityData.lon, wheatherKey);
      } else {
        throw new Error('Упс! Город не найден, попробуйте другой');
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
      setSubmitting(false);
      inputEl.current.focus();
    }
  };

  const getLocatedWeather = () => {
    async function success(position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      const weatheRequest = await makeWeatherRequest(latitude, longitude, wheatherKey);
      if (weatheRequest) {
        setActiveCity({ ...activeCity, cityName: weatherData.cityName });
      }
    }

    function locError() {
      console.log('Unable to retrieve your location');
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, locError);
    } else {
      console.log('Geolocation not supported');
    }
  };

  useEffect(() => {
    try {
      getLocatedWeather();
    } catch (e) {
      console.log(e);
      makeWeatherRequest(activeCity.lat, activeCity.lon, wheatherKey);
    }
  }, []);

  return (
    <div className="search-panel" style={{ transform: `${searchPanel ? 'translateX(0)' : 'translate(-100%)'}` }}>
      <div className="search-panel__container">
        <button className="search-panel__close-button" onClick={() => closeBtn('close')} id="close-panel" type="button" aria-label="Закрыть панель">
          <img src={searchIcon} alt="search icon" />
        </button>
        <form className="search-panel__form" onSubmit={handleSubmit}>
          <div className="search-bar__input-block">
            <input type="search" value={inputValue} ref={inputEl} onChange={handleChange} className="buttons search-bar__input" id="search" />
            {error && (
              <p className="search-bar__error-msg">
                {error}
              </p>
            )}
          </div>
          <label htmlFor="search" className="visually-hidden">
            Поиск города
          </label>
          <button className="search-bar__button buttons" disabled={isSubmitting} id="search-city" aria-label="Найти" type="submit">
            Найти
          </button>
        </form>
        <div className="search-bar__searched-cities">
          {searched.length !== 0 && (
            searched.map((item) => (
              <button type="button" key={_.uniqueId()} onClick={() => handleActiveClick(item)} className={cn('search-bar__searched-btn', { active: activeCity.cityName === item.cityName })}>
                {item.cityName}
                {activeCity.cityName === item.cityName && (
                  <img src={BtnArrow} alt="button arrow right" />
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
