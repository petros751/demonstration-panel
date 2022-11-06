import React, { useEffect } from 'react';
import { Header, List, Dimmer, Loader, Item } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { fetchCartUser, usersSliceSelector } from '../users/usersSlice';


const SelectedCart = (props) => {
    const dispatch = useDispatch();
    const { cartUser } = useSelector(usersSliceSelector);

    useEffect(() => {
        dispatch(fetchCartUser(props.cart.userId))
    }, [props.cart.products]);

    const renderProductsList = () => (props.cart.products.lenght
        ? (
            <List.Item>
                <Header as="h4">No carts found!</Header>
            </List.Item>
        )
        : props.cart.products.map((productItem, i) => (
            <List.Item key={i}>
                <List.Content floated='right'>
                    Total: {productItem.total}€
                </List.Content>
                <List.Content>
                    <List.Header>{productItem.title}</List.Header>
                    <List.Description>Price: {productItem.price}€ x {productItem.quantity}</List.Description>
                </List.Content>
            </List.Item>
        )));

    const cartsProductsListLoading = (
        <List.Item>
            <Dimmer active inverted>
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={80}
                    width={80}
                    timeout={10000}
                    className="spinner" />
            </Dimmer>
        </List.Item>
    );

    return (
        <div>
            <Header>Cart id: {props.cart.id}</Header>
            <Header>Order Products: </Header>
            <List divided verticalAlign='middle'>
                {props.cart.products ? renderProductsList(props.cart.products) : cartsProductsListLoading}
            </List>
            {cartUser ?
                <div>
                    <Header>Customer Informations:</Header>
                    <Item.Description>
                        <p>Name: {cartUser.firstName} {cartUser.lastName}</p>
                        <p>Phone: {cartUser.phone}</p>
                        <p>Email: {cartUser.email}</p>
                        <p>Address: {cartUser.address.address}, {cartUser.address.city}, {cartUser.address.state}, {cartUser.address.postalCode}</p>
                    </Item.Description>
                </div>
                :
                <div>
                    <Header>Customer Informations:</Header>
                    <Item.Description>
                        <p>Not avaliable yet!</p>
                    </Item.Description>
                </div>
            }
            <Header>Final total: {props.cart.total}€</Header>
        </div>
    );
};

export default SelectedCart;