const cityHost = 'https://nominatim.openstreetmap.org';
const weatherHost = 'https://api.openweathermap.org';
const weatherIconHost = 'https://openweathermap.org';

const routes = {
  cityRoute: (data) => new URL(`/search.php?q=${data}&format=json&addressdetails=1&limit=1&accept-language=ru`, cityHost),
  weatherRoute: (lat, lon, key) => new URL(`/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=ru`, weatherHost),
  forecastRoute: (lat, lon, key) => new URL(`/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=ru`, weatherHost),
  weatherIcon: (icon) => new URL(`/img/wn/${icon}@2x.png`, weatherIconHost),
  weatherBigIcon: (icon) => new URL(`/img/wn/${icon}@4x.png`, weatherIconHost),
};

export default routes;
