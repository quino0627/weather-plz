import React from 'react';
import styled from 'styled-components';
import useTheme from '../hooks/useTheme';
import MoonIcon from '../library/icons/moon.svg';
import SunIcon from '../library/icons/sun.svg';

interface buttonProps {
  readonly lightTheme: boolean;
}

const ToggleButton = styled.button<buttonProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 120px;
  height: 50px;
  padding: 5px 15px;

  overflow: hidden;
  font-size: 5px;
  cursor: pointer;
  /* background: ${({ theme }) => theme.gradient}; */
  background: ${({ theme }) => theme.toggleGradient};
  box-shadow: ${({ theme }) => theme.toggleShadow};
  border: none;
  border-radius: 15px;

  svg {
    height: auto;
    width: 30px;
    transition: all 0.3s linear;
    filter: drop-shadow(${({ theme }) => theme.toggleDropShadow});

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
