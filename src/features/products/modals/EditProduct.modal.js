import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Grid } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { updateProduct } from '../productsSlice';
import 'react-toastify/dist/ReactToastify.css';

const EditProductModal = (props) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [id, setId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(props.product.title);
    setPrice(props.product.price);
    setDescription(props.product.description);
    setStock(props.product.stock);
    setId(props.product.id);
  }, [props.user]);

  const handleInputChange = (evt, { name, value }) => {
    if (name === 'title') {
        setTitle(value);
    } else if (name === 'price') {
        setPrice(value);
    } else if (name === 'description') {
        setDescription(value);
    } else if (name === 'stock') {
        setStock(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
        title,
        price,
        description,
        stock,
        id,
    };
    dispatch(updateProduct(product));
    props.handleClose();
  };

  const onCloseClick = () => {
    props.handleClose();
  };

  return (
    <div>
      <Modal open={props.modalOpen} data-cy="edit-modal">
        <Modal.Header>Edit Product</Modal.Header>
        <Modal.Content scrolling>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Title</label>
              <Form.Input
                data-cy="edit-modal-title"
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleInputChange}
                value={title}
              />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <Form.Input
                data-cy="edit-modal-price"
                type="text"
                placeholder="Price"
                name="price"
                onChange={handleInputChange}
                value={price}
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <Form.Input
                data-cy="edit-modal-description"
                type="text"
                placeholder="Description"
                name="description"
                onChange={handleInputChange}
                value={description}
              />
            </Form.Field>
            <Form.Field>
              <label>Stock</label>
              <Form.Input
                data-cy="edit-modal-stock"
                type="text"
                placeholder="Stock"
                name="stock"
                onChange={handleInputChange}
                value={stock}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button data-cy='product-modal-update' type="submit" className="loginBtn btn" onClick={handleSubmit}>Save User</Button>
          <Button data-cy='product-modal-close' onClick={onCloseClick}>Close</Button>
        </Modal.Actions>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default EditProductModal;
