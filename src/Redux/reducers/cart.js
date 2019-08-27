import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  SEND_ORDER,
  ADD_RATING
} from "../actionTypes";
const Cart = (
  state = {
    cart: []
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      let isFound = false;
      const items = state.cart.map(p => {
        if (p._id === action.item._id) {
          isFound = true;
          ++p.quantity;
          return p;
        }
        return p;
      });
      if (!isFound) {
        action.item.rating = 0;
        action.item.quantity = 1;
        return { cart: [...state.cart, action.item] };
      } else {
        return { cart: [...items] };
      }
    case REMOVE_FROM_CART:
      return { cart: [...state.cart.filter(p => p._id !== action.item._id)] };
    case UPDATE_QUANTITY:
      return {
        cart: [
          ...state.cart.map(p => {
            if (p._id === action.item._id) {
              p.quantity = action.quantity;
            }
            return p;
          })
        ]
      };
    case SEND_ORDER:
      return { cart: [] };
    case ADD_RATING:
      return {
        cart: state.cart.map(item => {
          if (item._id === action.item._id) {
            item.rating = action.item.rating;
            return item;
          }
          return item;
        })
      };
    default:
      return state;
  }
};

export default Cart;
