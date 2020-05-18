/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import './style.scss';


export type TInputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type TInputFocusEvent = React.FocusEventHandler<HTMLInputElement>;
export type TChangeHandler = (e: TInputChangeEvent) => void;

interface IProps {
  value: string | string[] | number | undefined;
  onChange: TChangeHandler;
  onBlur?: TInputFocusEvent;
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
