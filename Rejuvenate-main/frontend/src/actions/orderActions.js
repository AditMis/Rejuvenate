import axios from 'axios';

export const orderActions_createOrder =
  (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'ORDER_CREATE_REQUEST',
      });

      const {
        userLogin: { userInfo },
      } = getState();
      //config for sending data, we want to send
      //headers with content type/ will also
      //set authorization for the token
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/orders`, order, config);

      dispatch({ type: 'ORDER_CREATE_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'ORDER_CREATE_FAIL',
        payload:
          //trying to getting the message obj from the custom error msg we
          //created, if !exists, display the current msg
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const orderActions_getOrderDetails =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'ORDER_DETAILS_REQUEST',
      });

      const {
        userLogin: { userInfo },
      } = getState();
      //config for sending data, we want to send
      //headers with content type/ will also
      //set authorization for the token
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/${id}`, config);

      dispatch({ type: 'ORDER_DETAILS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'ORDER_DETAILS_FAIL',
        payload:
          //trying to getting the message obj from the custom error msg we
          //created, if !exists, display the current msg
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const orderActions_payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'ORDER_PAY_REQUEST',
      });

      const {
        userLogin: { userInfo },
      } = getState();
      //config for sending data, we want to send
      //headers with content type/ will also
      //set authorization for the token
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({ type: 'ORDER_PAY_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'ORDER_PAY_FAIL',
        payload:
          //trying to getting the message obj from the custom error msg we
          //created, if !exists, display the current msg
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const orderActions_deliverOrder =
  (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'ORDER_DELIVER_REQUEST',
      });

      const {
        userLogin: { userInfo },
      } = getState();
      //config for sending data, we want to send
      //headers with content type/ will also
      //set authorization for the token
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        config
      );

      dispatch({ type: 'ORDER_DELIVER_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'ORDER_DELIVER_FAIL',
        payload:
          //trying to getting the message obj from the custom error msg we
          //created, if !exists, display the current msg
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const orderActions_listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'ORDER_LIST_MY_REQUEST',
    });

    const {
      userLogin: { userInfo },
    } = getState();
    //config for sending data, we want to send
    //headers with content type/ will also
    //set authorization for the token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({ type: 'ORDER_LIST_MY_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'ORDER_LIST_MY_FAIL',
      payload:
        //trying to getting the message obj from the custom error msg we
        //created, if !exists, display the current msg
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderActions_listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'ORDER_LIST_REQUEST',
    });

    const {
      userLogin: { userInfo },
    } = getState();
    //config for sending data, we want to send
    //headers with content type/ will also
    //set authorization for the token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({ type: 'ORDER_LIST_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'ORDER_LIST_FAIL',
      payload:
        //trying to getting the message obj from the custom error msg we
        //created, if !exists, display the current msg
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
