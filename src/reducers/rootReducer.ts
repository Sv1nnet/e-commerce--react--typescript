/* eslint-disable no-case-declarations */
import { Reducer } from 'redux';
import { cartTypes, paymentTypes } from '@/actions/actionTypes';
import { TState, IProduct, ICart } from './types';


export const getDiscountMultiplier: (discount: number) => number = (discount) => ((100 - discount) / 100);

const emptyCart: ICart = {
  products: [],
  total: 0,
};

const cartFromLocalStorage = localStorage ? localStorage.getItem('cart') : null;
const parsedCartFromLocalStorage: ICart = cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : emptyCart;
const initialState: TState = {
  cart: parsedCartFromLocalStorage,
};


const rootReducer: Reducer<TState> = (state = initialState, action) => {
  let discountMultiplier: number = 1;
  let newState = { ...state };
  const { type, data } = action;
  switch (type) {
    case cartTypes.ADD_TO_CART:
      discountMultiplier = getDiscountMultiplier(data.discount);
      const newItemPrice: number = data.price * discountMultiplier;

      newState = {
        ...state,
        cart: {
          products: [...state.cart.products, data],
          total: state.cart.total + newItemPrice,
        },
      };

      if (localStorage) localStorage.setItem('cart', JSON.stringify(newState.cart));

      return newState;
    case cartTypes.REMOVE_FROM_CART:
      const itemToRemove = state.cart.products.find((item) => item.id === action.data);
      discountMultiplier = itemToRemove ? getDiscountMultiplier(itemToRemove.discount) : 1;
      const priceToDeduct = itemToRemove ? itemToRemove.price * discountMultiplier : 0;

      newState = {
        ...state,
        cart: {
          products: state.cart.products.filter((item: IProduct) => item.id !== action.data),
          total: state.cart.total - priceToDeduct,
        },
      };

      if (localStorage) localStorage.setItem('cart', JSON.stringify(newState.cart));

      return newState;
    case paymentTypes.MAKE_PAYMENT:
      if (localStorage) localStorage.setItem('cart', '');
      return {
        cart: {
          products: [],
          total: 0,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
