/* eslint-disable no-shadow */
import { range, inRange } from 'lodash';
import { useState, useEffect, useCallback } from 'react';
import { weatherListType } from '../library/types/weatherListType';
import { baseWeatherType } from '../library/types/baseWeatherType';

const HEIGHT = 210;

export default function useDnDList(
  data: weatherListType | null
): {
  orderedData: baseWeatherType[];
  handleDrag: ({ translation, id }: any) => void;
  handleDragEnd: () => void;
  draggedIndex: number | null;
  dragData: baseWeatherType[];
  draggingIndex: number | null;
} {
  // optional chaining because of asynchorous data
  const items = range(data?.cnt ?? 0);
  const [state, setState] = useState({
    draggedIndex: null,
    originOrder: data?.list,
    dragData: data?.list,
    draggingIndex: null,
  });

  // init after fetching data
  useEffect(() => {
    setState(state => ({
      ...state,
      originOrder: data?.list,
      dragData: data?.list,
    }));
  }, [data?.cnt]);

  const handleDrag = useCallback(
    ({ translation, id }) => {
      const delta = Math.round(translation.y / HEIGHT);
      const dragData = state.originOrder!.filter(
        (_data, index) => index !== id
      );

      if (!inRange(id + delta, 0, items.length)) {
        return;
      }

      dragData.splice(id + delta, 0, state.originOrder?.[id]);

      setState(state => ({
        ...state,
        draggedIndex: id,
        dragData,
        draggingIndex: id + delta,
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

  return {
    orderedData: state.originOrder,
    draggedIndex: state.draggedIndex,
    dragData: state.dragData,
    draggingIndex: state.draggingIndex,
    handleDrag,
    handleDragEnd,
  };
}
