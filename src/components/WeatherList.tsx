import React from 'react';
import styled from 'styled-components';
import useDnDList from '../hooks/useDnDList';
import useWeathersById from '../hooks/useWeathersById';
import WeatherItem from './WeatherItem';

const IntroText = styled.div`
  ${({ theme }) => theme.introText}
  padding-bottom:16px;
  padding-top: 10px;
`;

const List = styled.ul`
  padding-bottom: 100px;
  min-height: 1000px;
`;

const HEIGHT = 210;

const WeatherList: React.FunctionComponent = () => {
  const { data, loading, error } = useWeathersById();
  const {
    orderedData,
    dragData,
    draggedIndex,
    handleDrag,
    handleDragEnd,
  } = useDnDList(data);
  return (
    <>
      <IntroText>How About Others?</IntroText>
      <List>
        {loading && data === null && <div>로딩중</div>}
        {!loading &&
          orderedData?.map((weather, idx) => {
            const isDragging = draggedIndex === idx;
            const top =
              orderedData.findIndex(i => i.id === weather.id) * (HEIGHT + 25);
            const draggedTop =
              dragData.findIndex(i => i.id === weather.id) * (HEIGHT + 25);
            return (
              <WeatherItem
                isDragging={isDragging}
                top={isDragging ? top : draggedTop}
                className="draggable"
                key={weather.id}
                weather={weather}
                id={idx}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
              />
            );
          })}
      </List>
    </>
  );
};

export default WeatherList;
