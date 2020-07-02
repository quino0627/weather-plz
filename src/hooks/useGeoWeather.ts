import { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Weathers, fetchWeatherGeoAsync } from '../modules/weathers';
import { Geolocation, fetchLocationAsync } from '../modules/locations';
import { Loading } from '../modules/loading';

export default function useGeoWeather(): {
  error: any;
  data: any;
  loading: boolean;
  onFetchWeather: (e: SyntheticEvent) => void;
} {
  const dispatch = useDispatch();
  const { error, data, latitude, longitude, weatherLoading } = useSelector(
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
  const onFetchWeather = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (latitude !== null) {
      dispatch(fetchWeatherGeoAsync.request({ lat: latitude, lon: longitude }));
    } else {
      dispatch(fetchLocationAsync.request());
    }
  };
  return {
    error,
    data,
    loading: weatherLoading,
    onFetchWeather,
  };
}
