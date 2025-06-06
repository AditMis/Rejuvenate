import axios from 'axios';

export const cartActions_add = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: 'CART_ADD_ITEM',
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  //storing cartItems in localstorage for later retrieval
  //stringify because only strings saved in local storage
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const cartActions_remove = (id) => async (dispatch, getState) => {
  dispatch({
    type: 'CART_REMOVE_ITEM',
    payload: id,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const cartActions_saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: 'CART_SAVE_SHIPPING_ADDRESS',
    payload: data,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const cartActions_savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: 'CART_SAVE_PAYMENT_METHOD',
    payload: data,
  });
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
