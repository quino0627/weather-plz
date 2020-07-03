import { baseWeatherType } from './baseWeatherType';

export type weatherListType = { cnt: number } & { list: baseWeatherType[] };
