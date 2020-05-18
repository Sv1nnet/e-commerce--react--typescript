import React, { useState, useEffect } from 'react';
import { TProductInCart } from '@components/cart/Cart';
import { TRemoveFromCart } from '@components/app/App';
import TextInput, { TChangeHandler, TInputFocusEvent } from '@/components/ui/inputs/text/TextInput';
import SimpleButton from '@/components/ui/buttons/simpleButton/SimpleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


export type TSetNumber = (id: string, n: number) => void;
interface IProps {
  removeFromCart: TRemoveFromCart;
  updateNumber: TSetNumber;
  prod: TProductInCart;
}


/**
 * Get input value as a number
 */
export const getValidatedInputValue = (target: EventTarget & HTMLInputElement): number => {
  const { value } = target;
  const onlyDigitals: RegExp = /^\d+$/;

  if (value && value.match(onlyDigitals)) {
    return value[0] === '0'
      ? parseInt(value.substr(1), 10)
      : parseInt(value, 10);
  }
  return 0;
};


const ItemInCart: React.FC<IProps> = ({ removeFromCart, updateNumber, prod }) => {
  const { id, number } = prod;
  const [value, setValue] = useState<number>(number);

  const onChange: TChangeHandler = (e) => {
    const { target } = e;
    const newValue: number = getValidatedInputValue(target);

    setValue(newValue);
  };

  const onBlur: TInputFocusEvent = (e) => {
    const { target } = e;
    const newValue: number = getValidatedInputValue(target);

    setValue(newValue);
  };

  useEffect(() => {
    updateNumber(id, value);
  }, [value]);

  useEffect(() => {
    setValue(number);
  }, [prod.number]);

  return (
    <>
      <span className="Cart__item-title">{prod.name}</span>

      <div className="Cart__number-control-container">

        <SimpleButton className="Cart__number-control_add" onClick={() => { setValue((prevValue) => (prevValue + 1)); }}>+</SimpleButton>
        <TextInput value={prod.number} onChange={onChange} onBlur={onBlur} />
        <SimpleButton className="Cart__number-control_remove" onClick={() => { setValue((prevValue) => (prevValue - 1)); }}>-</SimpleButton>
        <SimpleButton className="Cart__number-control_remove-totally" onClick={() => { removeFromCart(id); }}>
          <FontAwesomeIcon icon={faPlus} />
        </SimpleButton>
      </div>
    </>
  );
};

export default React.memo(ItemInCart, (prev, cur) => prev.prod.number === cur.prod.number);
