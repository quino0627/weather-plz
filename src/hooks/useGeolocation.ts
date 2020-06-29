import { useState, useEffect, useCallback } from 'react';

export default function useGeolocation(): {
  loading: boolean;
  error: string | null;
  accuracy?: number | undefined;
  altitude?: number | null | undefined;
  altitudeAccuracy?: number | null | undefined;
  heading?: number | null | undefined;
  latitude?: number | undefined;
  longitude?: number | undefined;
  speed?: number | undefined;
} {
  const [position, setPosition] = useState<Partial<Coordinates> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSuccess: PositionCallback = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    setLoading(false);
  };

  const onError: PositionErrorCallback = err => {
    setError(err.message);
    setLoading(false);
  };

  const options = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0,
  };

  useEffect(() => {
    const { geolocation } = navigator;
    if (!geolocation) {
      setError('Geolocation is not allowed/supported');
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }, []);

  return {
    ...position,
    loading,
    error,
  };
}
