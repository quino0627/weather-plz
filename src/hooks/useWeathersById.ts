import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { getType } from 'typesafe-actions';
import { Loading } from '../modules/loading';
import {
  Weathers,
  fetchWeathersByIdAsync,
  getLocalStorage,
} from '../modules/weathers';
import { weatherListType } from '../library/types/weatherListType';
import { getWithExpire } from '../library/utils';

export default function useGeoWeather(): {
  error: string | null;
  data: weatherListType | null;
  loading: boolean;
} {
  const dispatch = useDispatch();
  const { error, data, weatherLoading } = useSelector(
    ({ weathers, loading }: { weathers: Weathers; loading: Loading }) => ({
      data: weathers.cityWeathers,
      error: weathers.error.locationWeather,
      weatherLoading: loading['weathers/'],
    })
  );
  const constructData = useCallback(() => {
    const sampleData = [1835224, 1835327, 1838519, 1843561];
    dispatch(fetchWeathersByIdAsync.request(sampleData));
  }, []);

  useEffect(() => {
    const localData = getWithExpire(getType(fetchWeathersByIdAsync.success));
    if (localData) {
      dispatch(getLocalStorage({ cityWeathers: localData }));
    } else {
      constructData();
    }
  }, []);
  return { error, data, loading: weatherLoading };
}
