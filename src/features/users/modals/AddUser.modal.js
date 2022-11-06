import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { createUser } from '../usersSlice';
import 'react-toastify/dist/ReactToastify.css';

const AddUserModal = (props) => {
    const initialState = {
        username: '',
        lastName: '',
        firstName: '',
        email: '',
      };
      const [state, setState] = useState({
        username: '',
        lastName: '',
        firstName: '',
        email: '',
      });
  const dispatch = useDispatch();


  const handleInputChange = (evt) => {
    const { value } = evt.target;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      firstName: state.firstName,
      lastName: state.lastName,
      username: state.username,
      email: state.email,
    };
    dispatch(createUser(user));
    props.handleClose();
    setState({ ...initialState });
  };

  const onCloseClick = () => {
    props.handleClose();
  };

  return (
    <div>
      <Modal open={props.modalOpen}>
        <Modal.Header>Add New User</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>First name</label>
              <Form.Input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleInputChange}
                value={state.firstName}
              />
            </Form.Field>
            <Form.Field>
              <label>Last name</label>
              <Form.Input
                type="text"
                placeholder="Last name"
                name="lastName"
                onChange={handleInputChange}
                value={state.lastName}
              />
            </Form.Field>
            <Form.Field>
              <label>Username</label>
              <Form.Input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                value={state.username}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Form.Input
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleInputChange}
                value={state.email}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button type="submit" className="loginBtn btn" onClick={handleSubmit}>Create User</Button>
          <Button onClick={onCloseClick}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default AddUserModal;
