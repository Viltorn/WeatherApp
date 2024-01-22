import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { parseForecast, parseWeatherData } from '../utils/parseFunctions';
import routes from '../routes';

const WeatherContext = createContext({});

export const WeatherProvider = ({ children }) => {
  const [activeCity, setActiveCity] = useState({ cityName: 'Москва', lat: 55.6256, lon: 37.6064 });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSearchOpen, toogleSearchBar] = useState(false);
  const [forecastData, setForeCastData] = useState({ daysForecast: [], hoursForecast: [] });
  const [weatherData, setWeatherData] = useState({
    windData: { speed: 7, name: 'СЗ', angle: 320 },
    temperature: 1,
    feelsTemp: -3,
    humidity: 84,
    visibility: 6.2,
    pressure: 742,
    currentDate: { weekDay: 'Вс', month: 'мар', day: 13 },
    icon: '13n',
    condition: 'Снег',
  });

  const setSearchedHistory = (data) => localStorage.setItem('weatherSearchedCities', JSON.stringify(data));

  const getSearchedHistory = () => JSON.parse(localStorage.getItem('weatherSearchedCities'));

  const wheatherKey = process.env.REACT_APP_WEATHER_API_KEY;

  const makeWeatherRequest = async (lat, lon, key) => {
    setLoading(true);
    try {
      const weather = await axios.get(routes.weatherRoute(lat, lon, key));
      const forecast = await axios.get(routes.forecastRoute(lat, lon, key));
      if (weather.status === 200 && forecast.status === 200) {
        setForeCastData(parseForecast(forecast.data));
        setWeatherData(parseWeatherData(weather.data));
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const getLocatedWeather = () => {
    function success(position) {
      try {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        makeWeatherRequest(latitude, longitude, wheatherKey);
        setActiveCity({ cityName: 'Текущее местоположение', lat: latitude, lon: longitude });
      } catch (e) {
        console.log(e.message);
      }
    }

    function locError() {
      console.log('Невозможно получить геолокацию');
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, locError);
    } else {
      console.log('Geolocation not supported');
    }
  };

  useEffect(() => {
    makeWeatherRequest(activeCity.lat, activeCity.lon, wheatherKey);
    // eslint-disable-next-line
  }, []);

  return (
    <WeatherContext.Provider value={{
      setSubmitting,
      getLocatedWeather,
      isSearchOpen,
      toogleSearchBar,
      error,
      isSubmitting,
      forecastData,
      setForeCastData,
      weatherData,
      setWeatherData,
      isLoading,
      setLoading,
      activeCity,
      setActiveCity,
      setSearchedHistory,
      getSearchedHistory,
      wheatherKey,
      makeWeatherRequest,
      setError,
    }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
