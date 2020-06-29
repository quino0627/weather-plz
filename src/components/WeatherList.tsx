import * as React from 'react';
import styled from 'styled-components';

interface IWeatherListProps {}

const List = styled.ul``;
const Item = styled.li``;
const WeatherList: React.FunctionComponent<IWeatherListProps> = props => {
  return (
    <List>
      <Item>서울, 최고온도, 최저온도</Item>
      <Item>서울, 최고온도, 최저온도</Item>
      <Item>서울, 최고온도, 최저온도</Item>
      <Item>서울, 최고온도, 최저온도</Item>
      <Item>서울, 최고온도, 최저온도</Item>
      <Item>서울, 최고온도, 최저온도</Item>
      <Item>서울, 최고온도, 최저온도</Item>
    </List>
  );
};

export default WeatherList;
