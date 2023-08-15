import { windDirections, weekDays, months } from '../weatherData.js';

const capitalize = (str) => {
  const first = str.charAt(0);
  const firstCap = first.toUpperCase();
  const remain = str.slice(1);
  return firstCap + remain;
};

export const parseForecast = (rowData) => {
  const forecastData = rowData.list;
  const currentDay = new Date().getDay();
  const parsedDaysForecast = forecastData.reduce((acc, item) => {
    const date = new Date(item.dt_txt);
    const dateInSeconds = item.dt;
    const dayNumber = date.getDay();
    const day = date.getDate();
    const month = months[date.getMonth()];
    const weekDay = weekDays[dayNumber];
    const tomorrow = weekDays[currentDay + 1] ?? weekDays[0];
    const itemName = tomorrow !== weekDays[dayNumber] ? `${weekDay} ${day} ${month}` : 'Завтра';
    const itemTemp = Math.round(item.main.temp);
    const itemIcon = item.weather[0].icon;
    if (currentDay !== dayNumber) {
      acc[itemName] = { temp: [...acc[itemName]?.temp ?? '', itemTemp], itemIcon, dateInSeconds };
    }
    return acc;
  }, {});
  const sortedDaysForecast = Object
    .entries(parsedDaysForecast)
    .sort((a, b) => a.dateInSeconds - b.dateInSeconds);

  const parsedHoursForecast = forecastData
    .slice(0, 8)
    .reduce((acc, item) => {
      const time = item.dt_txt.slice(11, 16);
      const temp = Math.round(item.main.temp);
      const itemIcon = item.weather[0].icon;
      acc = [...acc, [time, { temp, itemIcon }]];
      return acc;
    }, []);
  return { daysForecast: sortedDaysForecast, hoursForecast: parsedHoursForecast };
};

export const parseWeatherData = (rowData) => {
  const {
    main, wind, weather, name,
  } = rowData;
  const { temp, humidity } = main;
  const temperature = Math.round(temp);
  const feelsTemp = Math.round(main.feels_like);
  const windSpeed = Math.round(wind.speed);
  const angle = wind.deg;
  const windName = windDirections.find((direct) => wind.deg <= direct.maxDegree).name;
  const visibility = Math.round(rowData.visibility / 100) / 10;
  const pressure = Math.round(main.pressure / 1.333);
  const { icon, description } = weather[0];
  const condition = capitalize(description);
  const date = new Date();
  const dayNumber = date.getDay();
  const day = date.getDate();
  const month = months[date.getMonth()];
  const weekDay = weekDays[dayNumber];
  const data = {
    cityName: name,
    temperature,
    feelsTemp,
    windSpeed,
    pressure,
    humidity,
    visibility,
    windData: { name: windName, angle, speed: windSpeed },
    currentDate: { day, month, weekDay },
    condition,
    icon,
  };
  return data;
};

export const parseCityData = (rowData) => {
  const name = rowData.display_name;
  const { lat, lon } = rowData;
  const cityName = name.split(',')[0];
  return { cityName, lat, lon };
};
