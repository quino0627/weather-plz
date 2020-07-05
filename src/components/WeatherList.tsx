/* eslint-disable no-shadow */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import WeatherItem from './WeatherItem';
import useWeathersById from '../hooks/useWeathersById';

const IntroText = styled.div`
  ${({ theme }) => theme.introText}
  padding-bottom:16px;
  padding-top: 10px;
`;

const List = styled.ul`
  padding-bottom: 100px;
`;

const HEIGHT = 210;

const WeatherList: React.FunctionComponent = () => {
  const { data, loading, error } = useWeathersById();
  // optional chaining because of asynchorous data
  const items = range(data?.cnt ?? 0);
  const [state, setState] = useState({
    draggedIndex: null,
    originOrder: data?.list,
    dragData: data?.list,
  });

  // init after fetching data
  useEffect(() => {
    setState({
      draggedIndex: null,
      originOrder: data?.list,
      dragData: data?.list,
    });
  }, [data?.cnt]);

  const handleDrag = useCallback(
    ({ translation, id }) => {
      const delta = Math.round(translation.y / HEIGHT);
      // const dragOrder = state.order.filter(index => index !== id);
      const dragData = state.originOrder!.filter(
        (_data, index) => index !== id
      );
      // console.log(delta, id, dragOrder);
      if (!inRange(id + delta, 0, items.length)) {
        return;
      }

      dragData.splice(id + delta, 0, state.originOrder?.[id]);

      setState(state => ({
        ...state,
        draggedIndex: id,
        dragData,
      }));
    },
    [data, state.originOrder, items.length]
  );

  const handleDragEnd = useCallback(() => {
    setState(state => ({
      ...state,
      originOrder: state.dragData,
      draggedIndex: null,
    }));
  }, []);

  return (
    <>
      <IntroText>How About Others?</IntroText>
      <List>
        {loading && data === null && <div>로딩중</div>}
        {!loading &&
          state.originOrder?.map((weather, idx) => {
            // const isDragging = state.draggedIndex === idx;
            // const top = state.dragOrder.indexOf(idx) * (HEIGHT + 10);
            // const draggedTop = state.order.indexOf(idx) * (HEIGHT + 10);
            return (
              <WeatherItem
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
