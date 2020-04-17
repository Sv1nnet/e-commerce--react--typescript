import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      
      <NavLink to="/basket">Basket</NavLink>
      <NavLink to="/checkout">Checkout</NavLink>
      <NavLink to="/catalog">Catalog</NavLink>

    </nav>
  );
}

export default Navigation;
