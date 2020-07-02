import React from 'react';
import GeoBox from '../components/GeoBox';
import GeoWeatherBox from '../components/GeoWeatherBox';
import WeatherList from '../components/WeatherList';
import useGeoWeather from '../hooks/useGeoWeather';

// HOC of geolocation

const MainPage: React.FunctionComponent = () => {
  return (
    <>
      <GeoBox />
      <GeoWeatherBox />
      <WeatherList />
    </>
  );
};

export default MainPage;
