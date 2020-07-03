/* eslint-disable global-require */
import React from 'react';
import styled from 'styled-components';
import { baseWeatherType } from 'library/types/baseWeatherType';
import { locationWeatherType } from '../library/types/locationWeatherType';
import DynamicIcon from './common/DynamicIcon';

interface WrapperProps {
  readonly icon: string;
}

const WeatherContentWrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: space-between;
`;
const ContentColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:first-child {
    align-items: flex-start;
    justify-content: space-between;
  }
  &:nth-child(2) {
    svg {
      width: 150px;
      height: 150px;
    }
  }
  &:last-child {
    justify-content: flex-start;
    align-items: flex-end;
    padding-top: 20px;
  }
`;
const MainInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubInfos = styled.div`
  font-size: 14px;
  letter-spacing: 1.5px;
  &:first-child {
    padding-bottom: 8px;
  }
`;

const TempText = styled.div`
  font-weight: 500;
  font-size: 40px;
  padding: 12px 0;
`;
const DescriptionText = styled.div`
  font-size: 20px;
  font-weight: 300;
`;

const CountryText = styled.span`
  font-size: 15px;
`;
const CityText = styled.div`
  padding-top: 10px;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 6px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    width: 80%;
    left: calc(50% - 40%);
    height: 6px;
    background-color: ${({ theme }) => theme.fontColor};
    border-radius: 10px;
  }
`;

interface IWeatherContentProps {
  weatherInfo: baseWeatherType;
}

const WeatherContent: React.FunctionComponent<IWeatherContentProps> = ({
  weatherInfo,
}: IWeatherContentProps): React.ReactElement => {
  const {
    weather,
    sys: { country },
    main: { temp, humidity },
    wind: { speed },
    name,
  } = weatherInfo;
  const { description, icon } = weather[0];
  return (
    <WeatherContentWrapper icon={icon}>
      <ContentColumn>
        <MainInfos>
          <TempText>{temp}°C</TempText>
          <DescriptionText>{description}</DescriptionText>
        </MainInfos>
        <div>
          <SubInfos>HUMIDITY : {humidity} %</SubInfos>
          <SubInfos>WIND : {speed} K/M</SubInfos>
        </div>
      </ContentColumn>
      <ContentColumn>
        <DynamicIcon type={`icon${icon}`} />
      </ContentColumn>
      <ContentColumn>
        <CountryText>{country}</CountryText>
        <CityText>{name}</CityText>
      </ContentColumn>
    </WeatherContentWrapper>
  );
};

export default WeatherContent;
