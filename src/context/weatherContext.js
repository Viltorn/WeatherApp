import { createContext, useState } from 'react';

const WeatherContext = createContext({});

export const WeatherProvider = ({ children }) => {
  const [activeCity, setActiveCity] = useState({ cityName: 'Москва', lat: 55.6256, lon: 37.6064 });
  const [searched, addSearched] = useState([]);
  const [isLoading, setLoading] = useState(false);
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

  return (
    <WeatherContext.Provider value={{
      forecastData,
      setForeCastData,
      weatherData,
      setWeatherData,
      isLoading,
      setLoading,
      activeCity,
      setActiveCity,
      searched,
      addSearched,
    }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
