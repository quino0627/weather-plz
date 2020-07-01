import React from 'react';
import styled from 'styled-components';
import useTheme from '../hooks/useTheme';
import MoonIcon from '../icons/moon.svg';
import SunIcon from '../icons/sun.svg';

interface buttonProps {
  readonly lightTheme: boolean;
}

const ToggleButton = styled.button<buttonProps>`
  background: ${({ theme }) => theme.gradient};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 5px;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 5px 15px;
  width: 120px;
  height: 50px;

  svg {
    height: auto;
    width: 30px;
    transition: all 0.3s linear;

    &:first-child {
      transform: ${({ lightTheme }) =>
        lightTheme ? 'translateY(0)' : 'translateY(100px)'};
    }

    &:nth-child(2) {
      transform: ${({ lightTheme }) =>
        lightTheme ? 'translateY(-100px)' : 'translateY(0)'};
    }
  }
`;

const Toggle: React.FunctionComponent = () => {
  const { theme, onToggle } = useTheme();

  return (
    <ToggleButton onClick={onToggle} lightTheme={theme === 'light'}>
      <SunIcon />
      <MoonIcon />
    </ToggleButton>
  );
};

export default Toggle;
