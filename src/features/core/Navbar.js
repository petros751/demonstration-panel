/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { authSliceSelector, logOut } from '../auth/authSlice';

const NavBar = () => {
  const state = useSelector(authSliceSelector);
  const dispatch = useDispatch();
  
  const onLogout = () => {
    dispatch(logOut());
  };

  return (
    <Menu inverted>
      <Menu.Item>
        <img className="logoNavbar" src="../icons8-control-panel-48.png" />
      </Menu.Item>
      {state.token
        ? (
          <Menu.Menu position="right">
            <Dropdown item>
              <Dropdown.Menu>
                <Dropdown.Item 
                  onClick={onLogout}
                >
                  <Icon color="red" name="sign-out" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        )
        : <div />}
    </Menu>
  );
};

export default NavBar;
