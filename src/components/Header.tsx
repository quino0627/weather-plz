import React from 'react';
import styled from 'styled-components';
import Toggle from './Toggle';

const HeaderBlock = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 6px 50px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.headerGradient};
  box-shadow: ${({ theme }) => theme.headerShadow};
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 32px;
  text-shadow: ${({ theme }) => theme.dropShadow};
`;

const Header: React.FunctionComponent = () => {
  return (
    <HeaderBlock>
      <Logo>Weather-Plz</Logo>
      <Toggle />
    </HeaderBlock>
  );
};

export default Header;
