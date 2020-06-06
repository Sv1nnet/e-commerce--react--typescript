/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';

import './style.scss';


type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface IProps {
  text: string;
  id: string;
  onChange: (e: InputChangeEvent, checked?: boolean) => void;
  data?: {
    [key: string]: string,
  },
  name?: string;
  className?: string;
  defaultChecked?: boolean,
}


const Checkbox: React.FC<IProps> = (props) => {
  const {
    text,
    name = '',
    data = {},
    id,
    className,
    defaultChecked = false,
    onChange,
  } = props;

  const [checked, setChecked] = useState<boolean>(defaultChecked);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setChecked(!checked);
    onChange(e, !checked);
  };

  return (
    <label className={`Checkbox ${className || ''}`} htmlFor={id}>
      <input
        {...data}
        className="Checkbox__input"
        type="checkbox"
        name={name}
        id={id}
        onChange={handleChange}
        checked={checked}
      />
      <div className={`Checkbox__visual-box ${checked ? 'Checkbox__visual-box_active' : ''}`}>
        <FontAwesomeIcon className={`Checkbox__check-icon ${checked ? 'Checkbox__check-icon_active' : ''}`} icon={faCheck} />
      </div>
      <span className="Checkbox__text">{text}</span>
    </label>
  );
};

export default Checkbox;
