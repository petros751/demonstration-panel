import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { AuthRoute, UnAuthRoute } from './routes/WrappedRoutes';
import LoginComponent from './features/auth/LoginComponent';
import MainComponent from './features/MainComponent';
import { isLoading, loadingMessage } from './app/appSlice';
import Navbar from './features/core/Navbar';
// import { Provider } from 'react-redux';
// import { store } from './app/store';

const App = () => {
  const loading = useSelector(isLoading);
  const message = useSelector(loadingMessage);

  return (
    <BrowserRouter>
      {/* <Provider store={store}/> */}
      <Dimmer active={loading} page>
        <Loader>{ message }</Loader>
      </Dimmer>
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
