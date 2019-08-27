import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  SEND_ORDER,
  ADD_RATING
} from "../actionTypes";

export const addToCart = item => ({
  type: ADD_TO_CART,
  item
});

export const removeFromCart = item => ({
  type: REMOVE_FROM_CART,
  item
});

export const updateQuantity = (item, quantity) => ({
  type: UPDATE_QUANTITY,
  item,
  quantity
});

export const sendOrder = () => ({
  type: SEND_ORDER
});

export const addRating = item => ({
  type: ADD_RATING,
  item
});
