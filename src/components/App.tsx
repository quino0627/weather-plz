import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import Theme from '../styles/Theme';
import GlobalStyles from '../styles/GlobalStyles';
import Header from './Header';

import Routes from './Routes';

const Content = styled.div`
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
  margin: 0 auto;
`;

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = props => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          <Header />
          <Content>
            <Routes />
          </Content>
        </BrowserRouter>
      </ThemeProvider>
      <GlobalStyles />
    </>
  );
};

export default App;
