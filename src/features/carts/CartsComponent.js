import React, { useState, useEffect } from 'react';
import { Header, List, Pagination, Dimmer, Loader, Grid, Segment, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import SelectedCart from './SelectedCartComponent';
import _ from 'lodash';
import {
    cartsSliceSelector,
    fetchCarts,
} from './cartsSlice';

const INITIAL_FETCH_PARAMS = () => ({
    limit: 10
});

const Carts = () => {
    const [fetchCartsParams, setFetchCartsParams] = useState(INITIAL_FETCH_PARAMS);
    const [pagination, setPagination] = useState({ activePage: 1, totalPages: 1 });
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [enableSelectedCart, setEnableSelectedCart] = useState(false);
    const [selectedCart, setSelectedCart] = useState(null);
    const { carts, loadCarts, totalCarts, skip, limit } = useSelector(cartsSliceSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCarts(fetchCartsParams));
    }, [fetchCartsParams]);

    useEffect(() => {
        setPageSize(limit);
        setTotalItems(skip);
        const totalPages = Math.ceil(totalCarts / limit);
        const activePage = Math.floor(skip / limit) + 1;
        setTotalItems(totalCarts);
        setPagination({ totalPages, activePage });
    }, [carts])

    const showSelecetedCart = (cartItem) => {
        setEnableSelectedCart(true);
        setSelectedCart(cartItem);
    };

    const renderCartsList = () => (carts.lenght
        ? (
            <List.Item>
                <Header as="h4">No carts found!</Header>
            </List.Item>
        )
        : carts.map((cartItem, i) => (
            <List.Item key={i} onClick={() => { showSelecetedCart({ ...cartItem }); }}>
                 <Icon color='teal' name='shopping cart' />
                <List.Content verticalAlign='middle'>
                    <List.Header>Cart id: {cartItem.id}</List.Header>
                    <List.Description>Products: {cartItem.totalProducts}, Discount: {cartItem.discountedTotal}€</List.Description>
                    <List.Header>Total: {cartItem.total}€</List.Header>
                </List.Content>
            </List.Item>
        )));

    const cartsListLoading = (
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

    const handlePaginationChange = (e, data) => {
        setFetchCartsParams({ ...fetchCartsParams, skip: pageSize * (data.activePage - 1) });
    };

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
            <Grid columns={2} divided>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Segment>
                            <List selection verticalAlign='middle'>
                                {carts ? renderCartsList(carts) : cartsListLoading}
                            </List>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            {enableSelectedCart ? 
                                <SelectedCart cart={selectedCart} />
                            :
                               <span style={{marginLeft: "50%" }}>Not selected cart from the list!</span>
                            }
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
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
        </div>
    );
};

export default Carts;