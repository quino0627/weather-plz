import React from 'react';
import styled from 'styled-components';

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

interface IWeatherItemProps {}

const WeatherItem: React.FunctionComponent<IWeatherItemProps> = props => {
  return <WeatherItemWrapper>asdf</WeatherItemWrapper>;
};

export default WeatherItem;
