import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Loading } from '../modules/loading';
import { Weathers, fetchWeathersByIdAsync } from '../modules/weathers';

export default function useGeoWeather(): {
  error: string | null;
  data: unknown;
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
  useEffect(() => {
    const isExist = localStorage.getItem('weathers');
    const sampleData = [1835224, 1835327, 1838519, 1843561];
    if (!isExist) {
      dispatch(fetchWeathersByIdAsync.request(sampleData));
    }
  }, []);
  return { error, data, loading: weatherLoading };
}
