import React from 'react';
import styled from 'styled-components';
import WeatherItem from './WeatherItem';
import useWeathersById from '../hooks/useWeathersById';

const IntroText = styled.div`
  ${({ theme }) => theme.introText}
  padding-bottom:10px;
`;

const List = styled.ul`
  padding-bottom: 100px;
`;

const WeatherList: React.FunctionComponent = () => {
  const { data, loading, error } = useWeathersById();

  return (
    <>
      <IntroText>How About Others?</IntroText>
      <List>
        {loading && data === null && <div>로딩중</div>}
        {!loading &&
          data &&
          data.list.map(weather => (
            <WeatherItem key={weather.id} weather={weather} />
          ))}
      </List>
    </>
  );
};

export default WeatherList;
