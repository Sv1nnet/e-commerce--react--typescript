import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { addToCart as addToCartAction, removeFromCart as removeFromCartAction, changeProductNumber as changeProductNumberAction, IRemoveFromCartAction, IChangeProductNumberAction } from '@/actions/cartActions';
import { TRemoveFromCart, TChangeProductNumber } from '@components/app/App';
import { TState, ICart } from '@/reducers/types';
import ListItem from '../listItem/ListItem';
import ItemInCart, { TSetNumber } from './itemInCart/ItemInCart';

import './style.scss';


const mapDispatchToProps: TMapDispatchToProps = (dispatch) => ({
  removeFromCart: (id) => dispatch(removeFromCartAction(id)),
  changeProductNumber: (item) => dispatch(changeProductNumberAction(item)),
});

const mapStateToProps: TMapStateToProps = (state) => ({
  cart: {
    products: state.cart.products,
    total: state.cart.total,
  },
});


export type TMappedDispatch = { removeFromCart: TRemoveFromCart, changeProductNumber: TChangeProductNumber };
export type TMapDispatchToProps = (dispatch: ThunkDispatch<TState, undefined, IRemoveFromCartAction | IChangeProductNumberAction>) => TMappedDispatch;
export type IItemsInCart = { [key: string]: TProductInCart };
export type TCartToProps = { cart: ICart };
export type TMapStateToProps = (state: TState) => TCartToProps;
export type TProductInCart = {
  id: string;
  name: string;
  number: number;
};
interface IProps extends ReturnType<typeof mapDispatchToProps> {
  cart: ICart;
  className?: string;
}


const getProductListCallback = (cart: ICart) => (): TProductInCart[] => {
  const itemsInCart: IItemsInCart = {};
  const newState: TProductInCart[] = [];

  cart.products.forEach((prod) => {
    const { id } = prod;
    if (itemsInCart[id]) itemsInCart[id].number += 1;
    else itemsInCart[id] = { id, name: prod.name, number: 1 };
  });

  let prod: keyof IItemsInCart = 'id';
  for (prod in itemsInCart) {
    newState.push({
      id: itemsInCart[prod].id,
      name: itemsInCart[prod].name,
      number: itemsInCart[prod].number,
    });
  }

  return newState;
};


const Cart: React.FC<IProps> = ({ className = '', cart, removeFromCart, changeProductNumber }) => {
  const { products, total } = cart;
  const setNumber: TSetNumber = (id, number) => {
    const prodToDispatch = cart.products.find((item) => item.id === id);
    changeProductNumber!({ ...prodToDispatch!, number });
  };

  return (
    <div className={`Cart ${className}`}>
      {
        products.length <= 0
          ? (
            <ListItem>
              <span className="Cart__empty">Cart empty</span>
            </ListItem>
          )
          : products.map((prod) => (
            <ListItem key={prod.id}>
              <ItemInCart
                removeFromCart={removeFromCart}
                updateNumber={setNumber}
                prod={prod}
              />
            </ListItem>
          ))
      }
      {products.length > 0 && <Link className="Cart__checkout" to="/checkout">Checkout</Link>}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
