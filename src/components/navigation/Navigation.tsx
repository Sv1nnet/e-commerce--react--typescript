import React from 'react';
import Logo from '../ui/logo/Logo';
import BasketButton from '../ui/buttons/basketButton/BasketButton';

import './style.scss';


interface IProps {
  children?: React.ReactNode;
  className?: string;
}

const Navigation: React.FC<IProps> = ({ className }) => (
  <nav className={`Navigation ${className || ''}`}>
    <div className="Navigation__inner">

      <Logo />

      <div className="Navigation__button-container">
        <BasketButton />
      </div>

    </div>
  </nav>
);

export default Navigation;
