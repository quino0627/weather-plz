import React, { useState } from 'react';
import WeatherList from '../components/WeatherList';
import useGeolocation from '../hooks/useGeolocation';

// HOC of geolocation

const MainPage: React.FunctionComponent = () => {
  const { latitude, longitude, error, loading } = useGeolocation();
  return (
    <div>
      {loading && <div>loading location...</div>}
      {!loading && latitude && (
        <code>
          latitude: {latitude}
          <br />
          longitude: {longitude}
          <br />
        </code>
      )}
      <WeatherList />
    </div>
  );
};

export default MainPage;
