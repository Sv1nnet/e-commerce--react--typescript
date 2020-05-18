import React, { useState } from 'react';
import Logo from '../ui/logo/Logo';
import Cart from '../cart/Cart';
import BasketButton from '../ui/buttons/basketButton/BasketButton';

import './style.scss';


interface IProps {
  children?: React.ReactNode;
  className?: string;
}

const Navigation: React.FC<IProps> = ({ className }) => {
  const [isBasketOpened, setBasketOpened] = useState<boolean>(false);

  const onBasketClick = (e: React.SyntheticEvent<HTMLButtonElement>, state: boolean): void => {
    setBasketOpened(state);
  };

  return (
    <nav className={`Navigation ${className || ''}`}>
      <div className="Navigation__inner">

        <Logo />

        <div className="Navigation__button-container">
          <BasketButton onClick={onBasketClick} />
        </div>

        {
          !isBasketOpened && <Cart className="Navigation__cart" />
        }

      </div>
    </nav>
  );
};

export default Navigation;
