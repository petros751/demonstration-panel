import {
  LOGIN_URL,
  GET_USERS,
  GET_PRODUCTS,
  GET_CARTS,
  UPDATE_USER,
  CREATE_USER,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
} from './apiUrls';
import { request } from './request';

export const loginUser = async (payload) => {
  const requestOptions = {
    url: LOGIN_URL,
    method: 'POST',
    body: payload,
  };

  let response;
  try {
    response = await request(requestOptions);
  } catch (err) {
    if (err.response && err.response?.data) {
      response = err.response?.data;
    }
  }

  return response;
};

export const fetchUsersListCall = async (queryParams) => {
  const requestOptions = {
    url: `${GET_USERS}?limit=${queryParams.limit}&skip=${queryParams.skip ? queryParams.skip : 0}`,
    method: 'GET',
  };

  let response;
  try {
    response = await request(requestOptions);
  } catch (err) {
    if (err.response && err.response?.data) {
      response = err.response?.data;
    }
  }

  return response;
};

export const fetchProductsListCall = async (queryParams) => {
  const requestOptions = {
    url: `${GET_PRODUCTS}?limit=${queryParams.limit}&skip=${queryParams.skip ? queryParams.skip : 0}`,
    method: 'GET',
  };

  let response;
  try {
    response = await request(requestOptions);
  } catch (err) {
    if (err.response && err.response?.data) {
      response = err.response?.data;
    }
  }

  return response;
};

export const fetchCartsListCall = async (queryParams) => {
  const requestOptions = {
    url: `${GET_CARTS}?limit=${queryParams.limit}&skip=${queryParams.skip ? queryParams.skip : 0}`,
    method: 'GET',
  };

  let response;
  try {
    response = await request(requestOptions);
  } catch (err) {
    if (err.response && err.response?.data) {
      response = err.response?.data;
    }
  }

  return response;
};

export const updateUserCall = async (user) => {
  const requestOptions = {
    url: UPDATE_USER + user.id,
    method: 'PUT',
    body: user,
  };

  let response;
  try {
    response = await request(requestOptions);
  } catch (err) {
    if (err.response && err.response?.data) {
      response = err.response?.data;
    }
  }

  return response;
};

export const createUserCall = async (user) => {
  const requestOptions = {
    url: CREATE_USER,
    method: 'POST',
    body: user,
  };

  let response;
  try {
    response = await request(requestOptions);
  } catch (err) {
    if (err.response && err.response?.data) {
      response = err.response?.data;
    }
  }

  return response;
};

export const fetchCartUserCall = async (id) => {
  const requestOptions = {
    url: GET_USERS + '/' + id,
    method: 'GET',
  };

  let response;
  try {
    response = await request(requestOptions);
  } catch (err) {
    if (err.response && err.response?.data) {
      response = err.response?.data;
    }
  }

  return response;
};

export const deleteUserCall = async (id) => {
  const requestOptions = {
    url: GET_USERS + '/' + id,
    method: 'DELETE',
  };

  let response;
  try {
    response = await request(requestOptions);
  } catch (err) {
    if (err.response && err.response?.data) {
      response = err.response?.data;
    }
  }

  return response;
};

export const updateProductCall = async (product) => {
  const requestOptions = {
    url: UPDATE_PRODUCT + product.id,
    method: 'PUT',
    body: product
  };

  let response;
  try {
    response = await request(requestOptions);
  } catch (err) {
    if (err.response && err.response?.data) {
      response = err.response?.data;
    }
  }

  return response;
};

export const createProductCall = async (product) => {
  const requestOptions = {
    url: CREATE_PRODUCT,
    method: 'POST',
    body: product
  };

  let response;
  try {
    response = await request(requestOptions);
  } catch (err) {
    if (err.response && err.response?.data) {
      response = err.response?.data;
    }
  }

  return response;
};

export const deleteProductCall = async (id) => {
  const requestOptions = {
    url: DELETE_PRODUCT + id,
    method: 'DELETE'
  };

  let response;
  try {
    response = await request(requestOptions);
  } catch (err) {
    if (err.response && err.response?.data) {
      response = err.response?.data;
    }
  }

  return response;
};
