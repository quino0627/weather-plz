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
      {/* <button type="button" onClick={onFetchWeather}>
        fetch
      </button>
      <br />
      {loading && <div> fetching london weather... </div>}
      {!loading && !error && <code>{JSON.stringify(data)}</code>} */}
      <WeatherList />
    </>
  );
};

export default MainPage;
