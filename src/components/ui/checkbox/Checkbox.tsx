import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import './style.scss';


type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type ChangeHandler = (e: InputChangeEvent) => void;

interface IProps {
  text: string;
  name?: string;
  id: string;
  className?: string;
  defaultChecked?: boolean,
  onChange: (e: InputChangeEvent, checked?: boolean) => void;
}


const Checkbox: React.FC<IProps> = (props) => {
  const {
    text,
    name = '',
    id,
    className,
    defaultChecked = false,
    onChange,
  } = props;

  const [checked, setChecked] = useState<boolean>(defaultChecked);

  const handleChange: ChangeHandler = (e) => {
    setChecked(e.target.checked);
    onChange(e, e.target.checked);
  };

  return (
    <label className={`Checkbox ${className || ''}`} htmlFor={id}>
      <input
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
