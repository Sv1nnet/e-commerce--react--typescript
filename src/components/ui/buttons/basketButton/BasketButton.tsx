import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

import { TState } from '../../../../reducers/types';

import './style.scss';


interface IProps {
  numberOfItems: number;
  className?: string;
  onClick?: (e: TButtonEvent, state?: boolean) => void;
}

type TButtonEvent = React.SyntheticEvent<HTMLButtonElement>;
type IMapState = (state: TState) => { numberOfItems: number };


const BasketButton: React.FC<IProps> = ({ className, numberOfItems, onClick }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const buttonAction: React.EventHandler<TButtonEvent> = (e: TButtonEvent) => {
    setIsActive(!isActive);
    if (onClick) onClick(e, !isActive);
  };

  return (
    <button onClick={buttonAction} type="button" className={`BasketButton ${isActive ? 'BasketButton_active' : ''} ${className || ''}`}>
      <div className="BasketButton__inner">
        <div className="BasketButton__icon-container">
          <FontAwesomeIcon icon={faShoppingBasket} />
          <span className="BasketButton__item-counter">{numberOfItems}</span>
        </div>
      </div>
    </button>
  );
};

const mapStateToProps: IMapState = (state) => ({
  numberOfItems: state.cart.products.length,
});

export default connect(mapStateToProps)(BasketButton);