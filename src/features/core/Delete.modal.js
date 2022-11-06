/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { deleteUser, usersSliceSelector, setModalErrors } from '../users/usersSlice';
import { deleteProduct, setModalProductErrors,  productsSliceSelector} from '../products/productsSlice';

const DeleteModal = (props) => {
  const { type } = props;
  const { addUserModalErrors } = useSelector(usersSliceSelector);
  const { addProductModalErrors } = useSelector(productsSliceSelector);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (type === 'user') {
      dispatch(deleteUser(props.disableUser.id));
      props.handleClose();
      if (addUserModalErrors !== '') {
        toast.error(addUserModalErrors, { position: 'top-center' });
        dispatch(setModalErrors(''));
      } else {
        toast.success('User deleted successfully!', { position: 'top-center' });
      } 
    } else if (type === 'product') {
      dispatch(deleteProduct(props.disableProduct.id));
      props.handleClose();
      if (addProductModalErrors !== '') {
        toast.error(addProductModalErrors, { position: 'top-center' });
        dispatch(setModalProductErrors(''));
      } else {
        toast.success('Product deleted successfully!', { position: 'top-center' });
      } 
    }
  };

  const onCloseClick = () => {
    props.handleClose();
  };
  return (
    <div>
      <Modal size="mini" open={props.modalOpen}>
        <Modal.Header>{type === 'user' ? 'Delete User' : 'Delete Product ' }</Modal.Header>
        <Modal.Content>
          <div>
            You are about to delete the:
            {' '}
            {type === 'user' ?
            <b>{props.disableUser.username}</b>
            :
            <b>{props.disableProduct.title}</b>
            }
            {' '}
            {type === 'user' ?
            'user and he/she will lose access to the UI. Do you want to continue?'
            :
            'Do you want to continue?'
            }
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button type="submit" basic color='red' onClick={handleSubmit}>Delete</Button>
          <Button onClick={onCloseClick}>Cancel</Button>
        </Modal.Actions>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default DeleteModal;
