import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSliceSelector } from '../features/auth/authSlice';

export const AuthRoute = ({ component: Component, ...rest }) => {
  const { auth } = useSelector(authSliceSelector);
  console.log('AuthRoute: ', auth);
  const isAuth = auth;
  return (
    <Route
      {...rest}
      render={(props) => (
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      )}
    />
  );
};

export const UnAuthRoute = ({ component: Component, ...rest }) => {
  const { auth } = useSelector(authSliceSelector);
  const isAuth = auth;
  console.log('UnAuthRoute: ', auth);
  return (
    <Route
      {...rest}
      render={(props) => (
        isAuth ? (
          <Redirect to={{ pathname: '/main' }} />
        ) : (
          <Component {...props} />
        )
      )}
    />
  );
};
