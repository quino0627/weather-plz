import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainPage from '../pages/MainPage';

const Routes: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Redirect path="*" to="/" />
    </Switch>
  );
};

export default Routes;
