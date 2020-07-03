import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import { lightTheme, darkTheme } from '../library/styles/Theme';
import GlobalStyles from '../library/styles/GlobalStyles';
import Header from './common/Header';
import Routes from './Routes';
import Footer from './common/Footer';

const Wrapper = styled.div`
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.fontColor};
  transition: all 0.3s linear;
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 0 80px;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

const App: React.FunctionComponent = () => {
  // for theme setting
  const { theme, themeMount } = useTheme();
  if (!themeMount) return <div />;

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Wrapper>
        <BrowserRouter>
          <Header />
          <Content>
            <Routes />
          </Content>
          <Footer />
        </BrowserRouter>
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
