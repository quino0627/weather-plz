import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { baseWeatherType } from '../library/types/baseWeatherType';
import WeatherContent from './WeatherContent';

const WeatherItemWrapper = styled.div`
  padding: 30px 60px;
  border-radius: 16px;
  margin-bottom: 30px;

  background: ${({ theme }) => theme.boxGradient};
  box-shadow: ${({ theme }) => theme.boxShadow};
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

interface IWeatherItemProps {
  weather: baseWeatherType;
}

const WeatherItem: React.FunctionComponent<IWeatherItemProps> = ({
  weather,
}: IWeatherItemProps): ReactElement => {
  return (
    <WeatherItemWrapper>
      <WeatherContent weatherInfo={weather} />
    </WeatherItemWrapper>
  );
};

export default WeatherItem;
