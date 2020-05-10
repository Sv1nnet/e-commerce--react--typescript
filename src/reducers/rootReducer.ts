/* eslint-disable no-case-declarations */
import { Reducer } from 'redux';
import { cartTypes, paymentTypes } from '@/actions/actionTypes';
import { TState, IProduct } from './types';


export const getDiscountMultiplier: (discount: number) => number = (discount) => ((100 - discount) / 100);

const initialState: TState = {
  cart: {
    products: [],
    total: 0,
  },
};

const rootReducer: Reducer<TState> = (state = initialState, action) => {
  let discountMultiplier: number = 1;
  const { type, data } = action;
  switch (type) {
    case cartTypes.ADD_TO_CART:
      discountMultiplier = getDiscountMultiplier(data.discount);
      const newItemPrice: number = data.price * discountMultiplier;

      return {
        ...state,
        cart: {
          products: [...state.cart.products, data],
          total: state.cart.total + newItemPrice,
        },
      };
    case cartTypes.REMOVE_FROM_CART:
      const itemToRemove = state.cart.products.find((item) => item.id === action.data);
      discountMultiplier = itemToRemove ? getDiscountMultiplier(itemToRemove.discount) : 1;
      const priceToDeduct = itemToRemove ? itemToRemove.price * discountMultiplier : 0;

      return {
        ...state,
        cart: {
          products: state.cart.products.filter((item: IProduct) => item.id !== action.data),
          total: state.cart.total - priceToDeduct,
        },
      };
    case paymentTypes.MAKE_PAYMENT:
      return initialState;
    default:
      return state;
  }
};

export default rootReducer;
