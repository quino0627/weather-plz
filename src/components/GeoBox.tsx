import * as React from 'react';
import styled from 'styled-components';
import Location from '../icons/location.svg';
import useGeolocation from '../hooks/useGeolocation';

const GeoBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const GetGeoButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;

  background-color: transparent;
  border: none;
  border-radius: 50px;

  cursor: pointer;
  transition: all 0.2s linear;

  filter: drop-shadow(${({ theme }) => theme.dropShadow});
  &:hover {
    transform: scale(1.1);
  }
  svg {
    height: auto;
    width: 100%;
  }
`;

const IntroText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 30px;
  color: ${({ theme }) => theme.fontColor};
`;

const GeoBox: React.FunctionComponent = (): React.ReactElement => {
  const { onFetchGeolocation } = useGeolocation();
  return (
    <GeoBoxWrapper>
      <IntroText>날씨</IntroText>
      <GetGeoButton onClick={onFetchGeolocation}>
        <Location />
      </GetGeoButton>
    </GeoBoxWrapper>
  );
};

export default GeoBox;
