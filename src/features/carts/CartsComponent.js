import React, { useState, useEffect } from 'react';
import { Header, Button, Item, Dimmer, Loader } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
    cartsSliceSelector,
    fetchCarts,
} from './cartsSlice';

const Carts = () => {
    const { carts, loadCarts } = useSelector(cartsSliceSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCarts());
    }, []);

    const renderCartsList = () => (products.lenght
        ? (
            <Item>
                <Header as="h4">No carts found!</Header>
            </Item>
        )
        : carts.map((cartItem, i) => (
            <Item key={i}>
                <Item.Image size='small' src={cartItem.thumbnail} />

                <Item.Content verticalAlign='middle'>
                    <Item.Header>{cartItem.title}</Item.Header>
                    <Item.Description>Stock: {cartItem.stock}</Item.Description>
                    <Item.Extra>
                        <Button floated='right'>More</Button>
                    </Item.Extra>
                </Item.Content>
            </Item>
        )));

    const cartsListLoading = (
        <Item>
            <Dimmer active inverted>
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={80}
                    width={80}
                    timeout={10000}
                    className="spinner" />
            </Dimmer>
        </Item>
    );

    return (
        <div>
            <Dimmer active={loadCarts} inverted>
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={80}
                    width={80}
                    timeout={10000}
                    className="spinner" />
            </Dimmer>
            <Item.Group relaxed>
                {carts ? renderCartsList(carts) : cartsListLoading}
            </Item.Group>
        </div>
    );
};

export default Carts;