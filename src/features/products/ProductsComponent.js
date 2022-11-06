import React, { useState, useEffect } from 'react';
import { Header, Button, Table, Dimmer, Loader, Image } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
    productsSliceSelector,
    fetchProducts,
} from './productsSlice';

const Products = () => {
    const { products, loadProducts } = useSelector(productsSliceSelector);
    const [editmodeProductModal, setEditmodeProductModal] = useState(false);
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('users');
        console.log('loadUsers');
        dispatch(fetchProducts());
    }, []);

    const showeditProductModal = (productItem) => {
        setEditmodeProductModal(true);
        setProduct(productItem);
    };

    const renderProductsList = () => (products.lenght
        ? (
            <Table.Row>
                <Table.Cell textAlign="center" colSpan={9}>
                    <Header as="h4">No products found!</Header>
                </Table.Cell>
            </Table.Row>
        )
        : products.map((productItem, i) => (
             <Table.Row key={i}>
             <Table.Cell width={1}>
                 <Button
                     size="tiny"
                     onClick={() => { showeditProductModal({ ...productItem }); }}
                     circular
                     color="blue"
                     icon="edit" />
             </Table.Cell>
             <Table.Cell width={1}><Image src={productItem.thumbnail} size='small' /></Table.Cell>
             <Table.Cell width={1}>{productItem.title || '-'}</Table.Cell>
             <Table.Cell width={1}>{productItem.stock || '-'}</Table.Cell>
             <Table.Cell width={1}>{productItem.price || '-'}€</Table.Cell>
             <Table.Cell width={1}>{productItem.brand || '-'}</Table.Cell>
         </Table.Row>
        )));

    const productsListLoading = (
        <Table.Row>
            <Table.Cell colSpan={13} textAlign="center">
                <Dimmer active inverted>
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={80}
                        width={80}
                        timeout={10000}
                        className="spinner" />
                </Dimmer>
            </Table.Cell>
        </Table.Row>
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
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                        <Table.HeaderCell>Image</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Stock</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Brand</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {products ? renderProductsList(products) : productsListLoading}
                </Table.Body>
            </Table>
        </div>
    );
};

export default Products;