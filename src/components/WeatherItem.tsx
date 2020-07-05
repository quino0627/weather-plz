/* eslint-disable no-shadow */
import React, { ReactElement, useState, useCallback, useEffect } from 'react';
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
  className: string;
  weather: baseWeatherType;
  id: number;
  onDrag: ({ translation, id }: any) => void;
  onDragEnd: () => void;
}
const POSITION = { x: 0, y: 0 };

const WeatherItem: React.FunctionComponent<IWeatherItemProps> = ({
  weather,
  className,
  onDrag,
  onDragEnd,
  id,
}: IWeatherItemProps): ReactElement => {
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
  });

  useEffect(() => {
    // console.log(state);
  }, [state.isDragging, state.origin, state.translation]);

  // mousedown event로부터 clientX, clientY값을 받는다.
  // isDragging:true로 state값을 설정한다.
  // origin값을 설정한다.
  // isDragging이 true이면
  // window eventlistener에 mousemove와 mouseup값을 등록한다.
  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setState(state => ({
      ...state,
      isDragging: true,
      origin: { x: clientX, y: clientY },
    }));
  }, []);

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const translation = {
        x: clientX - state.origin.x,
        y: clientY - state.origin.y,
      };
      setState(state => ({
        ...state,
        translation,
      }));
      onDrag({ translation, id });
    },
    [state.origin, onDrag, id]
  );

  const handleMouseUp = useCallback(() => {
    setState(state => ({
      ...state,
      isDragging: false,
    }));

    onDragEnd();
  }, [onDragEnd]);

  useEffect(() => {
    if (state.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      setState(state => ({ ...state, translation: { x: 0, y: 0 } }));
    }
  }, [state.isDragging, handleMouseMove, handleMouseUp]);

  return (
    <WeatherItemWrapper className={className} onMouseDown={handleMouseDown}>
      <WeatherContent weatherInfo={weather} />
    </WeatherItemWrapper>
  );
};

export default WeatherItem;
