import React from 'react';
import SideBar from './components/SideBar/SideBar.jsx';
import MainBlock from './components/MainBlock/MainBlock.jsx';
import { WeatherProvider } from './context/weatherContext.js';
import './App.css';

const App = () => (
  <div className="app-container">
    <WeatherProvider>
      <SideBar />
      <MainBlock />
    </WeatherProvider>
  </div>
);

export default App;
