import React from 'react';
import SideBar from './SideBar.jsx';
import MainBlock from './MainBlock.jsx';
import { WeatherProvider } from '../context/weatherContext.js';
import './MainBlock.css';

const App = () => (
  <div className="main-container">
    <WeatherProvider>
      <SideBar />
      <MainBlock />
    </WeatherProvider>
  </div>
);

export default App;
