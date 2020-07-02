import React, { useEffect } from 'react';
import styled from 'styled-components';
import ErrorContent from './ErrorContent';
import useGeolocation from '../hooks/useGeolocation';
import useGeoWeather from '../hooks/useGeoWeather';

const GeoWeatherBoxWrapper = styled.div`
  padding: 50px;
  border-radius: 16px;
  margin-bottom: 30px;

  background: ${({ theme }) => theme.boxGradient};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const GeoWeatherBox: React.FunctionComponent = (): React.ReactElement => {
  const {
    latitude,
    longitude,
    loading: geoLoading,
    error: geoError,
  } = useGeolocation();
  const { error, data, loading, onFetchWeather } = useGeoWeather();

  return (
    <GeoWeatherBoxWrapper>
      {!loading && data === null && (
        <button type="button" onClick={onFetchWeather}>
          날씨를 불러오기
        </button>
      )}
      {geoLoading && <div>위치를 찾아오는 중...</div>}
      {loading && <div>날씨를 불러오는 중...</div>}
      {!loading && data !== null && <div>{JSON.stringify(data)}</div>}
      {(error || geoError) && <ErrorContent />}
    </GeoWeatherBoxWrapper>
  );
};

export default GeoWeatherBox;
