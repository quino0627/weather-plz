import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { lightTheme, darkTheme } from '../styles/Theme';
import GlobalStyles from '../styles/GlobalStyles';
import Header from './Header';
import Routes from './Routes';
import Toggle from './Toggle';
import useTheme from 'hooks/useTheme';

const Wrapper = styled.div`
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.fontColor};
  transition: background-color 0.25s linear, color 0.25s linear;
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 0 48px;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = props => {
  // for theme setting

  const { theme, themeMount } = useTheme();
  if (!themeMount) return <div></div>;
  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <Wrapper>
          <BrowserRouter>
            <Header />
            <Toggle />
            <Content>
              <Routes />
            </Content>
            <span>Credits:</span>
            <small>
              <b>Sun</b> icon made by{' '}
              <a href="https://www.flaticon.com/authors/smalllikeart">
                smalllikeart
              </a>{' '}
              from <a href="https://www.flaticon.com">www.flaticon.com</a>
            </small>
            <small>
              <b>Moon</b> icon made by{' '}
              <a href="https://www.freepik.com/home">Freepik</a> from{' '}
              <a href="https://www.flaticon.com">www.flaticon.com</a>
            </small>
          </BrowserRouter>
        </Wrapper>
      </ThemeProvider>
      <GlobalStyles />
    </>
  );
};

export default App;
