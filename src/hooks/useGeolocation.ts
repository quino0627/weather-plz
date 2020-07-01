import { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Geolocation, fetchLocationAsync } from '../modules/locations';
import { Loading } from '../modules/loading';

export default function useGeolocation(): {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
  onFetchGeolocation: (e: SyntheticEvent) => void;
} {
  const dispatch = useDispatch();
  const { latitude, longitude, error, geoLoading } = useSelector(
    ({ locations, loading }: { locations: Geolocation; loading: Loading }) => ({
      latitude: locations.latitude,
      longitude: locations.longitude,
      error: locations.error,
      geoLoading: loading['locations/FETCH_LOCATION'],
    })
  );
  const onFetchGeolocation = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchLocationAsync.request());
  };
  return {
    latitude,
    longitude,
    error,
    loading: geoLoading,
    onFetchGeolocation,
  };
}
