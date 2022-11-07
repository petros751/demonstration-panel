import React, { useState, useEffect } from 'react';
import { Header, Button, Table, Dimmer, Loader, Image, Pagination } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
    productsSliceSelector,
    fetchProducts,
} from './productsSlice';
import EditProductModal from './modals/EditProduct.modal';
import AddProductModal from './modals/AddProduct.model';
import DeleteModal from '../core/Delete.modal';

const INITIAL_FETCH_PARAMS = () => ({
    limit: 8
});

const Products = () => {
    const [fetchProductsParams, setFetchProductsParams] = useState(INITIAL_FETCH_PARAMS);
    const { products, loadProducts, totalProducts, skip, limit } = useSelector(productsSliceSelector);
    const [editmodeProductModal, setEditmodeProductModal] = useState(false);
    const [deletedProductModal, setDeletedProductModal] = useState(false);
    const [product, setProduct] = useState(null);
    const [pagination, setPagination] = useState({ activePage: 1, totalPages: 1 });
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [addProductModal, setAddProductModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts(fetchProductsParams));
    }, [fetchProductsParams]);

    useEffect(() => {
        setPageSize(limit);
        setTotalItems(skip);
        const totalPages = Math.ceil(totalProducts / limit);
        const activePage = Math.floor(skip / limit) + 1;
        setTotalItems(totalProducts);
        setPagination({ totalPages, activePage });
    }, [products])

    const showeditProductModal = (productItem) => {
        setEditmodeProductModal(true);
        setProduct(productItem);
    };

    const showDeletedProductModal = (productItem) => {
        setDeletedProductModal(true);
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
            <Table.Row key={i} warning={productItem.stock <= 5 ? true : false} >
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
                <Table.Cell width={1} style={{textAlign: 'end'}}>
                    <Button
                        className="settings-button"
                        size="tiny"
                        onClick={() => { showDeletedProductModal({ ...productItem }); }}
                        circular
                        color="red"
                        icon="trash alternate outline" />
                </Table.Cell>
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

    const handlePaginationChange = (e, data) => {
        setFetchProductsParams({ ...fetchProductsParams, skip: pageSize * (data.activePage - 1) });
    };

    const showAddProductModal = () => {
        setAddProductModal(true);
    };

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
            <div className="logsFilters">
                <div className="filtersDate">
                    <Button circular size="tiny" onClick={() => showAddProductModal()} color="blue" icon="add circle" />
                </div>
            </div>
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                        <Table.HeaderCell>Image</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Stock</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Brand</Table.HeaderCell>
                        <Table.HeaderCell style={{textAlign: 'end'}}>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {products ? renderProductsList(products) : productsListLoading}
                </Table.Body>
            </Table>
            <div className="pagination-wrapper">
                <div>
                    {
                        totalItems ? (
                            <span>
                                Showing
                                {' '}
                                <b>{skip + 1}</b>
                                {' '}
                                <b>-</b>
                                <b>
                                    {
                                        Math.min(skip + limit, totalItems)
                                    }
                                </b>
                                {' '}
                  out of
                                {' '}
                                <b>{totalItems}</b>
                            </span>
                        ) : null
                    }
                </div>
                <div className="logs-pagination">
                    {
                        totalItems > pageSize
                        && (
                            <Pagination
                                activePage={pagination.activePage}
                                onPageChange={handlePaginationChange}
                                totalPages={pagination.totalPages || 0}
                                ellipsisItem={null}
                                firstItem={null}
                                lastItem={null}
                            />
                        )
                    }
                </div>
            </div>
            {/* Modals */}
            <AddProductModal
                modalOpen={addProductModal}
                handleClose={
                    () => {
                        setAddProductModal(false);
                    }
                }
            />
            {editmodeProductModal
                && (
                    <EditProductModal
                        modalOpen={editmodeProductModal}
                        handleClose={
                            () => {
                                setEditmodeProductModal(false);
                            }
                        }
                        product={product}
                        fetchProductsParams={fetchProductsParams}
                    />
                )}
            {deletedProductModal && (
                <DeleteModal
                    modalOpen={deletedProductModal}
                    handleClose={
                        () => {
                            setDeletedProductModal(false);
                        }
                    }
                    disableProduct={product}
                    type={'product'}
                />
            )}
        </div>
    );
};

export default Products;