import React from 'react';
import styled from 'styled-components';
import Toggle from './Toggle';

const HeaderBlock = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 6px 20px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.headerGradient};
  box-shadow: ${({ theme }) => theme.bottomShadow};
`;

const Header: React.FunctionComponent = () => {
  return (
    <HeaderBlock>
      <div>WeatherPlz</div>
      <Toggle />
    </HeaderBlock>
  );
};

export default Header;
