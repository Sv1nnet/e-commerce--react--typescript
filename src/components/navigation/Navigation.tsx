import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '@components/ui/logo/Logo';
import Cart, { TMapStateToProps } from '@components/cart/Cart';
import BasketButton from '../ui/buttons/basketButton/BasketButton';

import './style.scss';


const mapStateToProps: TMapStateToProps = (state) => ({
  cart: {
    products: state.cart.products,
    total: state.cart.total,
  },
});


interface IProps extends ReturnType<typeof mapStateToProps> {
  children?: React.ReactNode;
  className?: string;
}


const Navigation: React.FC<IProps> = ({ className, cart }) => {
  const { products } = cart;
  const [isCartOpened, setBasketOpened] = useState<boolean>(false);

  const onBasketClick = (e: React.SyntheticEvent<HTMLButtonElement>, state: boolean): void => {
    setBasketOpened(state);
  };

  const hideCart = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target && (!target.closest('.Navigation__cart') || target.classList.contains('Navigation__checkout-button'))) setBasketOpened(false);
  }, []);

  // Hide cart if the target of a click event is Checkout button or is not a cart
  useEffect(() => {
    if (isCartOpened) {
      window.addEventListener<'mousedown'>('mousedown', hideCart);
    }

    return () => window.removeEventListener<'click'>('click', hideCart);
  }, [isCartOpened]);

  return (
    <nav className={`Navigation ${className || ''}`}>
      <div className="Navigation__inner">

        <Logo />

        <div className="Navigation__button-container">
          <BasketButton isActive={isCartOpened} onClick={onBasketClick} />
        </div>

        {
          isCartOpened && (
            <Cart className="Navigation__cart">
              {products.length > 0 && (
                <Link className="Navigation__checkout-button" to="/checkout">Checkout</Link>
              )}
            </Cart>
          )
        }

      </div>
    </nav>
  );
};

export default connect(mapStateToProps)(Navigation);
