import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { Loading } from '../modules/loading';
import { Weathers, fetchWeathersByIdAsync } from '../modules/weathers';
import { weatherListType } from '../library/types/weatherListType';

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
    const isExist = localStorage.getItem('weathers');
    const sampleData = [1835224, 1835327, 1838519, 1843561];
    if (!isExist) {
      dispatch(fetchWeathersByIdAsync.request(sampleData));
    }
  }, []);

  useEffect(() => {
    constructData();
  }, []);
  return { error, data, loading: weatherLoading };
}
