import React from 'react';
import styled from 'styled-components';
import WeatherItem from './WeatherItem';
import useWeathersById from '../hooks/useWeathersById';

const List = styled.ul`
  padding-bottom: 100px;
`;

const WeatherList: React.FunctionComponent = () => {
  const { data, loading, error } = useWeathersById();
  return (
    <List>
      <WeatherItem />
      <WeatherItem />
      <WeatherItem />
      <WeatherItem />
      <WeatherItem />
      <WeatherItem />
      <WeatherItem />
    </List>
  );
};

export default WeatherList;
