import { SyntheticEvent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWithExpire } from '../library/utils';
import {
  Weathers,
  fetchWeatherGeoAsync,
  getLocalStorage,
} from '../modules/weathers';
import { Geolocation, fetchLocationAsync } from '../modules/locations';
import { Loading } from '../modules/loading';
import { locationWeatherType } from '../library/types/locationWeatherType';

export default function useGeoWeather(): {
  error: string | null;
  data: locationWeatherType | null;
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
      data: weathers.locationWeather,
      error: weathers.error.locationWeather,
      latitude: locations.latitude,
      longitude: locations.longitude,
      weatherLoading: loading['weathers/FETCH_WEATHER_GEO'],
    })
  );
  const onFetchWeather = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();
    if (latitude !== null) {
      dispatch(fetchWeatherGeoAsync.request({ lat: latitude, lon: longitude }));
    } else {
      dispatch(fetchLocationAsync.request());
    }
  }, []);

  useEffect(() => {
    const localData = getWithExpire(fetchWeatherGeoAsync.success.getType());
    if (localData) {
      dispatch(getLocalStorage({ locationWeather: localData }));
    }
  }, []);

  return {
    error,
    data,
    loading: weatherLoading,
    onFetchWeather,
  };
}
