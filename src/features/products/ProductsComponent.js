import React, { useState, useEffect } from 'react';
import { Header, Button, Item, Dimmer, Loader } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
    productsSliceSelector,
    fetchProducts,
} from './productsSlice';

const Products = () => {
    const { products, loadProducts } = useSelector(productsSliceSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('users');
        console.log('loadUsers');
        dispatch(fetchProducts());
    }, []);

    const renderProductsList = () => (products.lenght
        ? (
            <Item>
                <Header as="h4">No products found!</Header>
            </Item>
        )
        : products.map((productItem, i) => (
            <Item key={i}>
                <Item.Image size='small' src={productItem.thumbnail} />

                <Item.Content verticalAlign='middle'>
                    <Item.Header>{productItem.title}</Item.Header>
                    <Item.Description>Stock: {productItem.stock}</Item.Description>
                    <Item.Extra>
                        <Button floated='right'>More</Button>
                    </Item.Extra>
                </Item.Content>
            </Item>
        )));

    const productsListLoading = (
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
            <Dimmer active={loadProducts} inverted>
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height={80}
                    width={80}
                    timeout={10000}
                    className="spinner" />
            </Dimmer>
            <Item.Group relaxed>
                {products ? renderProductsList(products) : productsListLoading}
            </Item.Group>
        </div>
    );
};

export default Products;