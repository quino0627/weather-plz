import { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Weathers, fetchWeatherGeoAsync } from '../modules/weathers';
import { Geolocation } from '../modules/locations';
import { Loading } from '../modules/loading';

export default function useGeoWeather(): {
  error: any;
  data: any;
  loading: boolean;
  onFetchWeather: (e: SyntheticEvent) => void;
} {
  const dispatch = useDispatch();
  const { error, data, weatherLoading } = useSelector(
    ({
      weathers,
      locations,
      loading,
    }: {
      weathers: Weathers;
      locations: Geolocation;
      loading: Loading;
    }) => ({
      data: weathers.data,
      error: weathers.error,
      latitude: locations.latitude,
      longitude: locations.longitude,
      weatherLoading: loading['weathers/FETCH_WEATHER_GEO'],
    })
  );
  const onFetchWeather = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchWeatherGeoAsync.request({ lat: 1, lon: 2 }));
  };
  return {
    error,
    data,
    loading: weatherLoading,
    onFetchWeather,
  };
}
