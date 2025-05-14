// script containing product-actions which will be dispatched by product-Reducer
// for updating product(s) global state
import axios from 'axios';

//using thunk for fn inside of a fn
export const productActions_list =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: 'PRODUCT_LIST_REQUEST',
      });
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: 'PRODUCT_LIST_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'PRODUCT_LIST_FAIL',
        payload:
          //trying to getting the message obj from the custom error msg we
          //created, if !exists, display the current msg
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const productActions_details = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'PRODUCT_DETAILS_REQUEST',
    });
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: 'PRODUCT_DETAILS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DETAILS_FAIL',
      payload:
        //trying to getting the message obj from the custom error msg we
        //created, if not exists, display the current msg
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/*
-try (to dispatch this action) or catch (error)
-grabbing user's info from the state
-grabbing the 'token' from user's info and sending it as headers
 in the GET request
-GET request returns a promise which is grabbed in 'data' const
-finally dispatching the action containing the data
*/

export const productActions_delete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PRODUCT_DELETE_REQUEST' });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: 'PRODUCT_DELETE_SUCCESS' });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DELETE_FAIL',
      payload:
        //trying to getting the message obj from the custom error msg we
        //created, if not exists, display the current msg
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productActions_create = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'PRODUCT_CREATE_REQUEST' });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/`, {}, config);

    dispatch({ type: 'PRODUCT_CREATE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_CREATE_FAIL',
      payload:
        //trying to getting the message obj from the custom error msg we
        //created, if not exists, display the current msg
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productActions_update =
  (product) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'PRODUCT_UPDATE_REQUEST' });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      );

      dispatch({ type: 'PRODUCT_UPDATE_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'PRODUCT_UPDATE_FAIL',
        payload:
          //trying to getting the message obj from the custom error msg we
          //created, if not exists, display the current msg
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const productActions_createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: 'PRODUCT_CREATE_REVIEW_REQUEST' });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      dispatch({ type: 'PRODUCT_CREATE_REVIEW_SUCCESS' });
    } catch (error) {
      dispatch({
        type: 'PRODUCT_CREATE_REVIEW_FAIL',
        payload:
          //trying to getting the message obj from the custom error msg we
          //created, if not exists, display the current msg
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
