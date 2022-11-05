import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Form, Header, Icon,
} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router';
import { login, authSliceSelector, setAuthError } from './authSlice';

const LoginComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector(authSliceSelector);
  const { authError } = state;

  useEffect(() => {
    if (state.auth) {
      history.push('/main');
    }
  }, [history, state.auth]);

  useEffect(() => {
    if (authError) {
      setIsLoading(false);
      toast.error(authError);
      dispatch(setAuthError(null));
      setIsLoading(false);
    }
  }, [dispatch, authError]);

  const togglePassView = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const user = {
      username: username.toLowerCase(),
      password,
    };
    dispatch(login(user));
  };

  const OnChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const OnChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login_page_container">
      <div className="login_form_container">
        <div className="login_form_wrapper">
          <div>
            <Header as="h1" className="login_welcome">
              Welcome back!
            </Header>
            <Form onSubmit={handleSubmit} className="login_form">
              <Form.Input
                icon="user"
                iconPosition="left"
                label="Username"
                name="username"
                onChange={OnChangeUsername}
                value={username}
              />
              <Form.Input
                icon={<Icon name={showPassword ? 'eye slash' : 'eye'} link onClick={togglePassView} />}
                iconPosition="left"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                onChange={OnChangePassword}
                value={password}
              />
              <div className="form-group buttonLogin">
                {isLoading
                  ? (
                    <Loader
                      type="Puff"
                      color="#00BFFF"
                      height={40}
                      width={40}
                    />
                  )
                  : (
                    <Button size="big" type="submit" className="loginBtn btn" content="Login" primary />
                  )}
              </div>
            </Form>

          </div>
        </div>
      </div>
    </div>

  );
};
export default LoginComponent;
