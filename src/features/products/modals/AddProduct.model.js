import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../productsSlice';
import 'react-toastify/dist/ReactToastify.css';

const AddProductModal = (props) => {
    const initialState = {
        title: '',
        stock: '',
        price: '',
        brand: '',
      };
      const [state, setState] = useState({
        title: '',
        stock: '',
        price: '',
        brand: '',
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
    const product = {
        title: state.title,
        stock: state.stock,
        price: state.price,
        brand: state.brand,
    };
    dispatch(createProduct(product));
    props.handleClose();
    setState({ ...initialState });
  };

  const onCloseClick = () => {
    props.handleClose();
  };

  return (
    <div>
      <Modal open={props.modalOpen}>
        <Modal.Header>Add New Product</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Title</label>
              <Form.Input
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleInputChange}
                value={state.title}
              />
            </Form.Field>
            <Form.Field>
              <label>Stock</label>
              <Form.Input
                type="text"
                placeholder="Stock"
                name="stock"
                onChange={handleInputChange}
                value={state.stock}
              />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <Form.Input
                type="text"
                placeholder="Price"
                name="price"
                onChange={handleInputChange}
                value={state.price}
              />
            </Form.Field>
            <Form.Field>
              <label>Brand</label>
              <Form.Input
                type="text"
                placeholder="Brand"
                name="brand"
                onChange={handleInputChange}
                value={state.brand}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button type="submit" className="loginBtn btn" onClick={handleSubmit}>Create Product</Button>
          <Button onClick={onCloseClick}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default AddProductModal;
