import React, { useState, useEffect } from 'react';
import { Table, Dimmer, Loader, Header, Button, Pagination, } from 'semantic-ui-react';
import EditUserModal from './modals/EditUser.modal';
import AddUserModal from './modals/AddUser.modal';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import {
  usersSliceSelector,
  fetchUsers,
} from './usersSlice';

const INITIAL_FETCH_PARAMS = () => ({
  limit: 15
});

const UsersTable = () => {
  const [fetchUsersParams, setFetchUsersParams] = useState(INITIAL_FETCH_PARAMS);
  const [editmodeUserModal, setEditmodeUserModal] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [user, setUser] = useState(null);
  const [pagination, setPagination] = useState({ activePage: 1, totalPages: 1 });
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const { users, loadUsers, totalUsers, skip, limit } = useSelector(usersSliceSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers(fetchUsersParams));
  }, [fetchUsersParams]);

  useEffect(() => {
    setPageSize(limit);
    setTotalItems(skip);
    const totalPages = Math.ceil(totalUsers / limit);
    const activePage = Math.floor(skip / limit) + 1;
    setTotalItems(totalUsers);
    setPagination({ totalPages, activePage });
  }, [users])

  const showeditUserModal = (userItem) => {
    setEditmodeUserModal(true);
    setUser(userItem);
  };

  const renderUsersList = () => (!users.length
    ? (
      <Table.Row>
        <Table.Cell textAlign="center" colSpan={9}>
          <Header as="h4">No users found!</Header>
        </Table.Cell>
      </Table.Row>
    )
    : users.map((userItem, i) => (
      <Table.Row key={i}>
        <Table.Cell width={1}>
          <Button
            size="tiny"
            onClick={() => { showeditUserModal({ ...userItem }); }}
            circular
            color="blue"
            icon="edit" />
        </Table.Cell>
        <Table.Cell width={1}>{userItem.id}</Table.Cell>
        <Table.Cell width={1}>{userItem.firstName || '-'}</Table.Cell>
        <Table.Cell width={1}>{userItem.lastName || '-'}</Table.Cell>
        <Table.Cell width={1}>{userItem.username || '-'}</Table.Cell>
        <Table.Cell width={1}>{userItem.email || '-'}</Table.Cell>
        <Table.Cell width={1}>{userItem.company.title || '-'}</Table.Cell>
      </Table.Row>
    )));

  const usersListLoading = (
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
    setFetchUsersParams({ ...fetchUsersParams, skip: pageSize * (data.activePage - 1) });
  };

  const showAddUserModal = () => {
    setAddUserModal(true);
  };

  return (
    <div>
      <Dimmer active={loadUsers} inverted>
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
          <Button circular size="tiny" onClick={() => showAddUserModal()} color="blue" icon="add user" />
        </div>
      </div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Edit</Table.HeaderCell>
            <Table.HeaderCell> User id </Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            users ? renderUsersList(users) : usersListLoading
          }
        </Table.Body>
      </Table>
      <div className="logs-pagination-wrapper">
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
      <AddUserModal
        modalOpen={addUserModal}
        handleClose={
          () => {
            setAddUserModal(false);
          }
        }
      />
      {editmodeUserModal
        && (
          <EditUserModal
            modalOpen={editmodeUserModal}
            handleClose={
              () => {
                setEditmodeUserModal(false);
              }
            }
            user={user}
            fetchUsersParams={fetchUsersParams}
          />
        )}
    </div>
  );
};

export default UsersTable;