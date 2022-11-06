import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Grid } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { updateUser } from '../usersSlice';
import DeleteModal from './Delete.modal';
import 'react-toastify/dist/ReactToastify.css';

const EditUserModal = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [id, setId] = useState('');
  const [disableModal, setDisableModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(props.user.email);
    setLastName(props.user.lastName);
    setFirstName(props.user.firstName);
    setUsername(props.user.username);
    setId(props.user.id);
  }, [props.user]);

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
    dispatch(updateUser({ user, fetchUsersParams: props.fetchUsersParams }));
    props.handleClose();
  };

  const onCloseClick = () => {
    props.handleClose();
  };

  const deleteUserModal = () => {
    setDisableModal(!disableModal);
  };

  return (
    <div>
      <Modal open={props.modalOpen}>
        <Modal.Header>Edit User</Modal.Header>
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
          <div style={{textAlign: "center", marginTop: "2%"}}><Button onClick={deleteUserModal} basic color='red'>Delete User</Button></div>
        </Modal.Content>
        <Modal.Actions>
          <Button type="submit" className="loginBtn btn" onClick={handleSubmit}>Save User</Button>
          <Button onClick={onCloseClick}>Close</Button>
        </Modal.Actions>
      </Modal>
      <ToastContainer />
      {disableModal && (
      <DeleteModal
        modalOpen={disableModal}
        handleClose={
            () => {
              setDisableModal(false);
            }
          }
        disableUser={props.user}
      />
      )}
    </div>
  );
};

export default EditUserModal;
