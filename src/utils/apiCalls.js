import { 
  LOGIN_URL,
  GET_USERS,
  GET_PRODUCTS,
  GET_CARTS,
  UPDATE_USER,
  CREATE_USER,
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

  export const updateUserCall = async (user, ) => {
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

  export const createUserCall = async (user, ) => {
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

