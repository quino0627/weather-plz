/* eslint-disable no-shadow */
import React, {
  ReactElement,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import styled from 'styled-components';
import { baseWeatherType } from '../library/types/baseWeatherType';
import WeatherContent from './WeatherContent';

const WeatherItemWrapper = styled.div``;

const Rect = styled.div<IRectProps>`
  position: absolute;
  top: ${({ top }) => top}px;
  width: 775px;
  padding: 30px 60px;
  border-radius: 16px;
  margin-bottom: 30px;

  user-select: none;
  background: ${({ theme }) => theme.boxGradient};
  box-shadow: ${({ theme }) => theme.boxShadow};
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
interface IRectProps {
  isDragging: boolean;
  top: number;
}
interface IWeatherItemProps {
  isDragging: boolean;
  className: string;
  weather: baseWeatherType;
  id: number;
  onDrag: ({ translation, id }: any) => void;
  onDragEnd: () => void;
  top: number;
}
const POSITION = { x: 0, y: 0 };

const WeatherItem: React.FunctionComponent<IWeatherItemProps> = ({
  isDragging,
  weather,
  className,
  onDrag,
  onDragEnd,
  id,
  top,
}: IWeatherItemProps): ReactElement => {
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
  });

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

  const styles = useMemo(
    () =>
      ({
        cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
        transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
        zIndex: state.isDragging ? 2 : 1,
        position: state.isDragging ? 'absolute' : 'relative',
      } as React.CSSProperties),
    [state.isDragging, state.translation]
  );

  return (
    <WeatherItemWrapper
      style={styles}
      className={className}
      onMouseDown={handleMouseDown}
    >
      <Rect isDragging={isDragging} top={top}>
        <WeatherContent weatherInfo={weather} />
      </Rect>
    </WeatherItemWrapper>
  );
};

export default React.memo(WeatherItem);
