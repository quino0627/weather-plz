import React, { useEffect } from 'react';
import styled from 'styled-components';
import useGeolocation from '../hooks/useGeolocation';
import useGeoWeather from '../hooks/useGeoWeather';

const GeoWeatherBoxWrapper = styled.div`
  padding: 50px;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.boxShadow};
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

interface IGeoWeatherBoxProps {}

const GeoWeatherBox: React.FunctionComponent<IGeoWeatherBoxProps> = ({}: IGeoWeatherBoxProps): React.ReactElement => {
  const { latitude, longitude } = useGeolocation();
  const { error, data, loading, onFetchWeather } = useGeoWeather();
  useEffect(() => {
    console.log('changed!');
  }, [latitude, longitude]);
  return (
    <GeoWeatherBoxWrapper>
      <Title>지금 위치의 날씨는 . . .</Title>
      {loading ? <div>로딩증</div> : <div>{data}</div>}
    </GeoWeatherBoxWrapper>
  );
};

export default GeoWeatherBox;
