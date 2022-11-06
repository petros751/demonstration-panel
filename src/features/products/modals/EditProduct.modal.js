/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Dropdown, Input, Label, Checkbox, Grid, Header } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import _ from 'lodash';
import { updateProduct } from '../productsSlice';
import 'react-toastify/dist/ReactToastify.css';

const EditProductModal = (props) => {
    console.log(props);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [id, setId] = useState('');
  const dispatch = useDispatch();

//   useEffect(() => {
//     setEmail(props.user.email);
//     setLastName(props.user.lastName);
//     setFirstName(props.user.firstName);
//     setUsername(props.user.username);
//     setId(props.user.id);
//   }, [props.user]);

  const handleInputChange = (evt, { name, value }) => {
    if (name === 'lastName') {
      setLastName(value);
    } else if (name === 'username') {
      setUsername(value);
    } else if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'email') {
        setEmail(value);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      username,
      id,
    };
    dispatch(updateProduct({ user, fetchProductsParams: props.fetchProductsParams }));
    props.handleClose();
  };

  const onCloseClick = () => {
    props.handleClose();
  };

  return (
    <div>
      <Modal open={props.modalOpen}>
        <Modal.Header>
          <Grid divided="vertically">
            <Grid.Row columns={3}>
              <Grid.Column style={{ marginBottom: 0, margin: 'auto' }}>
                Edit Product
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Header>
        <Modal.Content scrolling>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>First name</label>
              <Form.Input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleInputChange}
                value={firstName}
              />
            </Form.Field>
            <Form.Field>
              <label>Last name</label>
              <Form.Input
                type="text"
                placeholder="Last name"
                name="lastName"
                onChange={handleInputChange}
                value={lastName}
              />
            </Form.Field>
            <Form.Field>
              <label>Username</label>
              <Form.Input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                value={username}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Form.Input
                type="text"
                placeholder="Email"
                name="Email"
                onChange={handleInputChange}
                value={email}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button type="submit" className="loginBtn btn" onClick={handleSubmit}>Save User</Button>
          <Button onClick={onCloseClick}>Close</Button>
        </Modal.Actions>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default EditProductModal;
