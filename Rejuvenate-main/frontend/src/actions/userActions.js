import axios from 'axios';

export const userActions_login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_LOGIN_REQUEST',
    });

    //config for sending data, we want to send
    //headers with content type/ will also
    //set authorization for the token
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload:
        //trying to getting the message obj from the custom error msg we
        //created, if !exists, display the current msg
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userActions_logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: 'USER_LOGOUT' });
  dispatch({ type: 'USER_DETAILS_RESET' });
  dispatch({ type: 'ORDER_LIST_MY_RESET' });
  dispatch({ type: 'USER_LIST_RESET' });
};

export const userActions_register =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: 'USER_REGISTER_REQUEST',
      });

      //config for sending data, we want to send
      //headers with content type/ will also
      //set authorization for the token
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      );

      dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data });
      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: 'USER_REGISTER_FAIL',
        payload:
          //trying to getting the message obj from the custom error msg we
          //created, if !exists, display the current msg
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//getting user info from state which has the token in ti
export const userActions_getUserDetails =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'USER_DETAILS_REQUEST',
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

      const { data } = await axios.get(`/api/users/${id}`, config);

      dispatch({ type: 'USER_DETAILS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'USER_DETAILS_FAIL',
        payload:
          //trying to getting the message obj from the custom error msg we
          //created, if !exists, display the current msg
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userActions_updateUserProfile =
  (user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'USER_UPDATE_PROFILE_REQUEST',
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

      const { data } = await axios.put(`/api/users/profile`, user, config);

      dispatch({ type: 'USER_UPDATE_PROFILE_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'USER_UPDATE_PROFILE_FAIL',
        payload:
          //trying to getting the message obj from the custom error msg we
          //created, if !exists, display the current msg
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userActions_listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'USER_LIST_REQUEST',
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

    const { data } = await axios.get(`/api/users`, config);

    dispatch({ type: 'USER_LIST_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_LIST_FAIL',
      payload:
        //trying to getting the message obj from the custom error msg we
        //created, if !exists, display the current msg
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userActions_deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_DELETE_REQUEST' });

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

    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: 'USER_DELETE_SUCCESS' });
  } catch (error) {
    dispatch({
      type: 'USER_DELETE_FAIL',
      payload:
        //trying to getting the message obj from the custom error msg we
        //created, if !exists, display the current msg
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userActions_updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_UPDATE_REQUEST' });

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

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({ type: 'USER_UPDATE_SUCCESS' });
    dispatch({ type: 'USER_DETAILS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_UPDATE_FAIL',
      payload:
        //trying to getting the message obj from the custom error msg we
        //created, if !exists, display the current msg
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
