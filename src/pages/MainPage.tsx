import React, {
  useState,
  useEffect,
  ReactElement,
  DOMElement,
  SyntheticEvent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import WeatherList from '../components/WeatherList';
import useGeolocation from '../hooks/useGeolocation';
import { fetchWeatherGeoAsync } from '../modules/weathers';

// HOC of geolocation

const MainPage: React.FunctionComponent = () => {
  const { latitude, longitude, error, loading } = useGeolocation();
  const dispatch = useDispatch();
  const { error: httpError, loading: httpLoading, data } = useSelector(
    (state: RootState) => state.weathers
  );
  // useEffect(() => {
  //   dispatch(fetchWeatherGeo);
  // }, []);
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  const onFetchWeather = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchWeatherGeoAsync.request('Asdf'));
  };
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
      <button type="button" onClick={onFetchWeather}>
        fetch
      </button>
      <br />
      {httpLoading && <div> fetching london weather... </div>}
      {!httpLoading && !httpError && <code>{JSON.stringify(data)}</code>}
      <WeatherList />
    </div>
  );
};

export default MainPage;
