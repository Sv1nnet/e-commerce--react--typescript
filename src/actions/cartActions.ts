import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { TState, IProduct } from '@/reducers/types';
import fakeFetch, { IRes, IPaymentData } from '@/fakeApi/fakeFetch';
import { cartTypes, paymentTypes } from './actionTypes';

export type TAddToCart = (product: IProduct) => (dispatch: ThunkDispatch<TState, undefined, IAddToCartAction>) => void;
export interface IAddToCartAction {
  type: 'ADD_TO_CART';
  data: IProduct;
}
export const addToCart: TAddToCart = (product) => (dispatch) => {
  dispatch({ type: cartTypes.ADD_TO_CART, data: product });
};


export type TRemoveFromCart = (id: string) => (dispatch: ThunkDispatch<TState, undefined, IRemoveFromCartAction>) => void;
export interface IRemoveFromCartAction {
  type: 'REMOVE_FROM_CART';
  data: string;
}
export const removeFromCart: TRemoveFromCart = (id) => (dispatch) => {
  dispatch({ type: cartTypes.REMOVE_FROM_CART, data: id });
};


export type TMakePayment = (paymentData: IPaymentData) => (dispatch: ThunkDispatch<TState, undefined, IPayAction>, getState: () => TState) => Promise<IRes>;
export interface IPayAction {
  type: 'MAKE_PAYMENT';
  data: { [key: string]: any};
}
export const makePayment: TMakePayment = (paymentData) => (dispatch, getState) => {
  const { products } = getState().cart;

  if (products.length <= 0) return Promise.reject(new Error('Cart is empty'));

  return fakeFetch('/pay', paymentData)
    .then((res) => {
      dispatch({ type: paymentTypes.MAKE_PAYMENT, data: res.data });
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
