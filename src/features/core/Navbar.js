/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useSelector } from 'react-redux';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';
import { authSliceSelector } from '../auth/authSlice';

const NavBar = () => {
  const state = useSelector(authSliceSelector);

  // const onLogout = () => {
  //   dispatch(logOut());
  // };

  // const handleItemClick = (type) => {
  //   setActiveItem(type);
  //   dispatch(setPanelToShow(type));
  // };

  return (
    <Menu inverted>
      <Menu.Item>
        <img className="logoNavbar" src="../icons8-control-panel-48.png" />
      </Menu.Item>
      {state.token
        ? (
          <Menu.Menu position="right">
            <Dropdown item text={state.user.name}>
              <Dropdown.Menu>
                <Dropdown.Item 
                  // onClick={onLogout}
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
