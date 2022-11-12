import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AuthRoute, UnAuthRoute } from './routes/WrappedRoutes';
import LoginComponent from './features/auth/LoginComponent';
import MainComponent from './features/MainComponent';
import Navbar from './features/core/Navbar';

const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <UnAuthRoute exact path="/login" component={LoginComponent} />
        <AuthRoute exact path="/main" component={MainComponent} />
        <Route path="*" render={() => <Redirect to="/login" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
