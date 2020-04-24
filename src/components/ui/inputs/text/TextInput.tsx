/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import './style.scss';


type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type ChangeHandler = (e: InputChangeEvent) => void;

interface IProps {
  value: string | string[] | number | undefined;
  onChange: ChangeHandler;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  data?: {
    [key: string]: string,
  },
  className?: string;
  id?: string;
  placeholder?: string;
  defaultValue?: string;
}


const TextInput: React.FC<IProps> = (props) => {
  const {
    value,
    onChange,
    onBlur,
    data = {},
    className,
    id,
    placeholder,
    defaultValue,
  } = props;

  return (
    <input
      type="text"
      name=""
      id={id}
      className={`TextInput ${className || ''}`}
      {...data}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
};

export default TextInput;
