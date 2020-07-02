import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
  padding-bottom: 100px;
`;
const Item = styled.li`
  padding: 20px;
  background-color: ${({ theme }) => theme.lightBlueColor};
  box-shadow: ${({ theme }) => theme.bottomShadow};
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
const WeatherList: React.FunctionComponent = () => {
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
