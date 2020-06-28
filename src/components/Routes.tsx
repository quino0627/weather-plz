import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainPage from 'pages/MainPage';

interface IRoutesProps {}

const Routes: React.FunctionComponent<IRoutesProps> = props => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Redirect path="*" to="/" />
    </Switch>
  );
};

export default Routes;
