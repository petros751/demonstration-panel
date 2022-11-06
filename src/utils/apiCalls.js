import { LOGIN_URL, GET_USERS, GET_PRODUCTS, GET_CARTS } from './apiUrls';
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

  export const fetchUsersListCall = async () => {
    const requestOptions = {
      url: GET_USERS,
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

  export const fetchProductsListCall = async () => {
    const requestOptions = {
      url: GET_PRODUCTS,
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

  export const fetchCartsListCall = async () => {
    const requestOptions = {
      url: GET_CARTS,
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
